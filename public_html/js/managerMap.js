var arrPoi=[];
var arrImp=[];
var arrCircle=[];
var arrCirclePosition = [];
var oldPoi = [];
var newPoi = [];
var idxNewPoi = -1;
var arrAddresses = [];

google.maps.Circle.prototype.contains = function(latLng) {
  return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
};

function addMarkerPOI(dati){
    var marker;
    var logo = window.logoPOI ? window.logoPOI : 'images/marker/poi.png';
    for (var r=0; r<dati.length; r++){
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(utils.changeStringToNumber(dati[r]['latitude Ovest-Est']), utils.changeStringToNumber(dati[r]['longitude Nord-Sud'])),
            //icon: 'Images/marker/poi.png',
            icon: logo,
            draggable: true,
            type: 'poi',
            info: new google.maps.InfoWindow({content: '<div class="contentPOI" ><b>' + dati[r]['DESCRIZIONE'] + '</b></br>'
                + dati[r]['INDIRIZZO'] + '</br>' + dati[r]['COMUNE'] + '</div>'})
        });
        marker.fvCenter = marker.getPosition();
        markerEvent(marker);
        arrPoi.push(marker);
    }
    setMarkerOnMap(arrPoi);
}
/** 
 *  
 *   @argument {array} dati List of coordinates to map on google
 **/
function addMarkerImp(dati){
    var marker;
    for (var r=0; r<dati.length; r++){
    var content = '<tr><td class="titleRow">' + dati[r]['SOCIETA'] + '</td><td class="impianto">' + dati[r]['TIPO_IMPIANTO'] + '</td><td class="indirizzo">' + dati[r]['INDIRIZZO'] + '</td><td class="number">' + dati[r]['GL_XCOORD']  + '</td><td class="number">' + dati[r]['GL_YCOORD'] + '</td></tr>';
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(utils.changeStringToNumber(dati[r]['GL_YCOORD']), utils.changeStringToNumber(dati[r]['GL_XCOORD'])), 
            icon: selectMarker(dati[r]['TIPO_IMPIANTO']),
            draggable: false,
            type: 'impianti',
            info: new google.maps.InfoWindow({content: content})
        });
        marker.fvCenter = marker.getPosition();
            markerEvent(marker);
            arrImp.push(marker);
    }
    setMarkerOnMap(arrImp);
}


function selectMarker(typePosition) {
    var medioF = 'Images/marker/medioFormato.png';
    var poster = 'Images/marker/poster.png';
    var altro = 'Images/marker/altro.png';
    if (typeof (typePosition) !== 'undefined') {
        if (typePosition.substring(6, 0) === 'MEDIOF') {
            return medioF;
        } else if (typePosition.indexOf('POSTER') !== -1) {
            return poster;
        } else {
            return altro;
        }
    }
}

function markerEvent(marker){
    google.maps.event.addListener(marker, 'click', function () {
        //window.fvMap.setZoom(14);
        window.fvMap.setCenter(marker.getPosition());
        marker.info.open(window.fvMap, marker);
        if (marker.type === 'poi') {
            if ($.inArray(marker.getPosition(), arrCirclePosition) === -1) {
                addCircle(marker.getPosition());
            }
        }
    });
    google.maps.event.addListener(marker, 'dragstart', function () {
        if (markerInArray(marker, newPoi) === -1){
            idxNewPoi = -1;
            //oldPoi.push(marker.getPosition());
            $('#saveAs').parent().removeClass('disabled');
        } else if (markerInArray(marker, newPoi) >= 0) {
            var idx = markerInArray(marker, newPoi);
            newPoi[idx]= null;
            idxNewPoi = idx;
        }
    });
    google.maps.event.addListener(marker, 'dragend', function(){
        if (idxNewPoi === -1){
            newPoi.push(marker);
        } else if (idxNewPoi >= 0){
            newPoi[idxNewPoi] = marker;
            idxNewPoi = -1;
        }
    });
}

function markerInArray(needle, haystack){
    if (haystack.length === 0){
        return -1;
    }
    for (var idx = 0; idx < haystack.length; idx++){
        if (needle.fvCenter.k === haystack[idx].fvCenter.k && needle.fvCenter.B === haystack[idx].fvCenter.B){
            return idx;
        }
    }
    return -1;
}

function addCircle(position){
    var myCircle = new google.maps.Circle({
        center: position, radius: Number($("#raggio").val()), 
        strokeColor: "#0000FF", 
        strokeOpacity: 0.8, 
        strokeWeight: 2, 
        fillColor: "0000FF",
        fillOpacity: 0.4
    });
    google.maps.event.addListener(myCircle, 'click', function(){
        //show the modal with the info
        getMarker(myCircle);
        //infoModal("infoMap", "raggio in metri: " + myCircle.getRadius());
        //+ myCircle.getCenter() + "<br> nbounds: " + myCircle.getBounds());
    });
    
    google.maps.event.addListener(myCircle, 'rightclick', function(){
        //show the modal with the info
        removeCircle(myCircle.getCenter());
    });
    arrCirclePosition.push(position);
    arrCircle.push(myCircle);
    myCircle.setMap(window.fvMap);
}

function removeCircle(position){
    var idx = $.inArray(position, arrCirclePosition);
    arrCircle[idx].setMap(null);
    arrCircle.splice(idx,1);
    arrCirclePosition.splice(idx,1);
}

function mapEvent() {
    //google.maps.event.addListener(map, 'click', function () { alert('hai cliccato la mappa'); });    
}

function setMarkerOnMap(arrMarker){
    //var bounds = new google.maps.LatLngBounds();
    for (var m = 0; m < arrMarker.length; m++){
        arrMarker[m].setMap(window.fvMap);
        //bounds.extend(arrMarker[m].position);
    }
    //map.fitBounds(bounds);
}
function eraseMarker(type){
    if (type === "POI"){
        for (var c = 0; c < arrCircle.length; c++){
            arrCircle[c].setMap(null);
        }
        arrCircle = [];
        arrCirclePosition = [];
        for (var m = 0; m < arrPoi.length; m++){
            arrPoi[m].setMap(null);
        }
        arrPoi = [];
        newPoi = [];
    }else if (type === "Bilboards"){
        for (var m = 0; m < arrImp.length; m++){
            arrImp[m].setMap(null);
        }
        arrImp = [];
    }else if (type === "List"){
        arrAddresses.forEach(function (row){
           row['marker'].setMap(null); 
        });/*
        for (var l = 0; l < arrAddresses.length; l++){
            arrAddresses[l].setMap(null);
        }*/
        arrAddresses = [];
    }
}

function getMarker(myCircle){
    var n = 0;
    var d = '<table class="table" id="infoTable"><tr><th>Società</th><th>Tipo Impianto</th><th>Indirizzo</th><th>Lat.</th><th>Long.</th></tr>';
    for (var i=0; i<arrImp.length; i++){
        if (myCircle.contains(arrImp[i].getPosition())){
            d += arrImp[i]['info']['content'];
            n++;
        }
    }
    d += '</table>';
    utils.infoModal("Ci sono " + n + " impianti nel raggio di " + myCircle.getRadius() + " mt.", d, false);
}

function getMarkerNewPosition(){
    var d = '<table class="table" id="infoTable"><tr><th rowspan="2">Cliente</th><th rowspan="2">Indirizzo</th><th colspan="2">Caricate</th><th colspan="2">Modificate</th></tr>';
    d += '<tr><th>Lat</th><th>Long</th><th>Lat</th><th>Long</th></tr>';
    var n = 0;
    for (var i=0; i<newPoi.length; i++){
            //markerInArray(newPoi[i], arrPoi)
            var t = newPoi[i]['info']['content'];
            d+= '<tr><td>' + t.substr(28,(t.indexOf("</b>")-28)) +
                    '</td><td>' + t.substr(t.indexOf("</br>")+5, t.indexOf("</br>", t.indexOf("</br>")+5) - t.indexOf("</br>")-5) + 
                    '</td><td>' + utils.changeStringToNumber(newPoi[i].getPosition().lat(), ",") + 
                    '</td><td>' + utils.changeStringToNumber(newPoi[i].getPosition().lng(), ",") + 
                    '</td><td>' + utils.changeStringToNumber(newPoi[i].fvCenter.lat(), ",") + 
                    '</td><td>' + utils.changeStringToNumber(newPoi[i].fvCenter.lng(), ",") + '</td></tr>';
            n++;
    }
    utils.infoModal("Sono cambiate " + n + " posizioni ", d, true);
}
//'<div class="contentPOI" ><b>' + dati[r]['DESCRIZIONE'] + '</b></br>'
                //+ dati[r]['INDIRIZZO'] + '</br>' + dati[r]['COMUNE'] + '</div>'
function codeAddress(addressList) {
    var t = '<table class="table" id="infoTable"><tr><th>Indirizzo</th><th>Lat.</th><th>Long.</th></tr>';
    var x = 0;
    var no = 0;
    for (var i = 0; i < addressList.length; i++) {
        geocoder.geocode({'address': addressList[i]}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                //map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: window.fvMap,
                    position: results[0].geometry.location
                });
                t += '<tr><td>' + results[0].formatted_address +
                        '</td><td>' + utils.changeStringToNumber(marker.getPosition().lat(), ',') +
                        '</td><td>' + utils.changeStringToNumber(marker.getPosition().lng(), ',') +
                        '</td></tr>';
                x++;
                arrAddresses.push({address: results[0].formatted_address, marker : marker});
            } else {
                x++;
                no++;
            }
        });
    }
    var xy = setInterval(function(){
        if (addressList.length === x){
            t += '</table>';
            utils.infoModal('Caricati ' + addressList.length + ' indirizzi di cui ' + no + ' non trovati.', t, true);
            clearInterval(xy);
        }
    }, 1000);
}
