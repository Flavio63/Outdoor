
window.menu_Map = Backbone.View.extend({
    tagName: 'div',
    id: 'menu_map',
    initialize: function () {
        this.render();
    },
    setting: function () {
        //$('#raggio').spinner({min: 250, max: 2500, step: 50, start: 500});
    },
    render: function () {
        $(this.el).html(this.template());
        this.setting();
        return this;
    },
    events: {
        'click li a': "clicked",
        'change #upLoadLogo': "getLogo"
    },
    clicked: function (e) {
        utils.handleClickEvent(e);
    },
    getLogo: function (e) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                $('#logoPoi').attr('src', evt.target.result);
                window.logoPOI = evt.target.result;
            };
            reader.readAsDataURL(e.currentTarget.files[0]);
        }
    },
});

window.googleMap = Backbone.View.extend({
    tagName: 'div',
    id: 'googleMap',
    initialize: function(){
        this.render();
    },
    activate: function(){
        var mapOptions = {
            zoom: 6,
            center: new google.maps.LatLng(41.901634, 12.480155),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        window.fvMap = new google.maps.Map(this.el, mapOptions);
        window.geocoder = new google.maps.Geocoder();
        $(window).resize(function(){
            $("#googleMap").height($(window).height() - $("#googleMap").offset().top + ($("#googleMap").outerHeight(true) - $("#googleMap").height()));
        })
        $('#raggio').spinner({min: 250, max: 2500, step: 50, start: 500});
    },
    render: function(){
        $(this.el).html(this.template());
        this.activate();
        return this;
    }
});

