window.utils = {
    // Asynchronously load templates located in separate .html files
    loadTemplate: function (views, callback) {

        var deferreds = [];

        $.each(views, function (index, view) {
            if (window[view]) {
                deferreds.push($.get('tmpl/tmp/' + view + '.html', function (data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
    uploadFile: function (file, callbackSuccess) {
        var self = this;
        var data = new FormData();
        data.append('file', file);
        $.ajax({
            url: 'php/upload.php',
            type: 'POST',
            data: data,
            processData: false,
            cache: false,
            contentType: false
        })
                .done(function () {
                    console.log(file.name + " uploaded successfully");
                    callbackSuccess();
                })
                .fail(function () {
                    self.showAlert('Error!', 'An error occurred while uploading ' + file.name, 'alert-error');
                });
    },
    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },
    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },
    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },
    showAlert: function (title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },
    hideAlert: function () {
        $('.alert').hide();
    },
    changeNumberSeparator: function (num) {
        if (typeof num === "number") {
            var s = String(num);
            if (s.indexOf(',')) {
                s = s.replace(/\./, ".");
            } else {
                s = s.replace(/\,/, ",");
            }
            return parseFloat(s);
        }
    },
    changeStringToNumber: function (strNum, DecimalSeparator) {
        var t;
        var result = 0;
        var typeToSubstitute;
        if (typeof DecimalSeparator === 'undefined') {
            DecimalSeparator = '.';
            typeToSubstitute = ',';
        } else {
            DecimalSeparator === '.' ? typeToSubstitute = ',' : typeToSubstitute = '.';
        }
        if (typeof strNum === "string") {
            t = strNum;
            if (strNum.indexOf(typeToSubstitute)) {
                t = t.replace(typeToSubstitute, DecimalSeparator);
                DecimalSeparator === '.' ? result = Number(t) : result = t;
            } else {
                result = Number(t);
            }
        } else {
            t = String(strNum);
            if (t.indexOf(typeToSubstitute)) {
                t = t.replace(typeToSubstitute, DecimalSeparator);
                DecimalSeparator === '.' ? result = Number(t) : result = t;
            }
        }
        return result;
    },
    fixDecimal: function (val) {
        var re = /([0-9]{3})$/g;
        var reDec = /(,[0-9]+)/g;
        var decPart = "";
        var s = "";
        if (typeof val === "number") {
            if (val <= 10) {
                val = (Math.round(100 * val) / 100).toFixed(2);
                s = String(val).replace(/\./, ",");
                decPart = s.match(reDec);
                s = s.replace(reDec, "");
            } else {
                val = (Math.round(val)).toFixed(0);
                s = String(val);
            }
            var threeDigit = [];
            if (s.length > 3) {
                for (var i = 0; i < s.length; i++) {
                    threeDigit[i] = s.match(re);
                    s = s.replace(re, "");
                    if (s.length < 3 && s.length > 0) {
                        i++;
                        threeDigit[i] = s;
                    }
                }
            } else {
                threeDigit[0] = s;
            }
            var result = "";
            for (var i = threeDigit.length - 1; i >= 0; i--) {
                if (i > 0) {
                    result += threeDigit[i] + ".";
                } else {
                    if (decPart === "") {
                        result += threeDigit[i];
                    } else {
                        result += threeDigit[i] + decPart;
                    }
                }
            }
            return result;
        }
    },
    handleClickEvent: function (e) {
        if (e.currentTarget['attributes'][0].value === "setMarker") {
            var up = $('<input type="file" name="file[]" id="impianti" accept=".csv"/>');
            $('body').append(up);
            document.getElementById('impianti').addEventListener('change', this.uploadFileSelect, false);
            $("#impianti").trigger('click');
            up.remove();
        } else if (e.currentTarget['attributes'][0].value === 'linkDB') {
            showFormBase();
        } else if (e.currentTarget['attributes'][0].value === "saveAs") {
            getMarkerNewPosition();
        } else if (e.currentTarget['attributes'][0].value === "erasePOI") {
            $("#saveAs").parent().addClass("disabled");
            eraseMarker("POI");
        } else if (e.currentTarget['attributes'][0].value === "eraseBilboards") {
            eraseMarker("Bilboards");
        } else if (e.currentTarget['attributes'][0].value === "eraseList") {
            eraseMarker("List");
            $("#upLoadList").parent().removeClass("disabled");
            $("#eraseList").parent().addClass("disabled");
        } else if (e.currentTarget['attributes'][0].value === "upLoadList") {
            var up = $('<input type="file" name="file[]" id="indirizzi" accept=".txt"/>');
            $('body').append(up);
            document.getElementById('indirizzi').addEventListener('change', this.uploadList, false);
            $("#indirizzi").trigger('click');
            up.remove();
            $("#eraseList").parent().removeClass("disabled");
            $("#upLoadList").parent().addClass("disabled");
        }
        e.preventDefault();
    },
    uploadFileSelect: function (e) {
        if (e.currentTarget.files !== undefined) {
            var reader = new FileReader();
            // the event and its function
            reader.onload = function (evt) {
                var records = evt.target.result.split("\n");
                var arrInt = [];
                var arrVal = [];
                var nRec = 0;
                for (var r = 0; r < records.length; r++) {
                    var record = records[r].split(';');
                    if (r === 0) {
                        for (var cInt = 0; cInt < record.length; cInt++) {
                            arrInt[cInt] = record[cInt];
                        }
                        if (arrInt[0] !== 'latitude Ovest-Est' && arrInt[7] !== 'GL_XCOORD') {
                            alert("Il file caricato non sembra corretto.");
                            return;
                        }
                    } else {
                        var item = {};
                        for (var c = 0; c < record.length; c++) {
                            item[arrInt[c]] = record[c];
                        }
                        arrVal.push(item);
                    }
                    nRec++;
                }
                if (arrInt[0] === 'latitude Ovest-Est') {
                    addMarkerPOI(arrVal);
                    alert("Ho caricato " + nRec + " record.");
                } else if (arrInt[7] === 'GL_XCOORD') {
                    addMarkerImp(arrVal);
                    alert("Ho caricato " + nRec + " record.");
                }
            };
            reader.readAsBinaryString(e.target.files.item(0));
        }
    },
    uploadList: function (e) {
        if (e.currentTarget.files !== undefined) {
            var reader = new FileReader();
            // the event and its function
            reader.onload = function (evt) {
                codeAddress(evt.target.result.split("\r"));
            };
            reader.readAsBinaryString(e.target.files.item(0));
        }
    },
    getUrlParameter: function (sParam) {
        var sPageUrl = window.location.search.substring(1);
        var sUrlVariables = sPageUrl.split('&');
        for (var i = 0; i < sUrlVariables.length; i++) {
            var sParameterName = sUrlVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
    },
    p: function (newPage) {
        var path = window.location.href.toString().split(window.location.host)[1].replace(window.location.href.toString().split(window.location.host)[1].split('/')[window.location.href.toString().split(window.location.host)[1].split('/').length - 1], newPage);
        return path;
    },
    infoModal: function (title, text, saveIt) {
        var page = "infoModal";
        var path = this.p("tmpl/" + page + ".html"); //actualPath(page);
        //var t = '<table class="table" id="infoTable"><tr><th>Società</th><th>Tipo Impianto</th><th>Indirizzo</th><th>Lat.</th><th>Long.</th></tr>';
        //t += text + '</table>';
        path = window.location.origin + path;
        $.get(path, function (data) {
            $("body").append(data);
            $("#title").text(title);
            $("#body").append(text);
            $("#" + page).on('hidden.bs.modal', function (e) {
                $("#" + page).remove();
            });
            if (saveIt) {
                $(function () {
                    var get_blob = function () {
                        var b = window.Blob;
                        return b;
                    };
                    var session = window.sessionStorage;
                    var tab = $("#infoTable")[0];
                    var btn = $("#textFvOpt")[0];
                    session.address = "";
                    for (var row = 0; row < tab.rows.length; row++) {
                        for (var col = 0; col < tab.rows[row].cells.length; col++) {
                            session.address += tab.rows[row].cells[col].innerText + "; "; // + tab.rows[row].cells[1].innerText + "; " + tab.rows[row].cells[2].innerText + "\n";
                        }
                        session.address += "\n";
                    }
                    btn.addEventListener('click', function (event) {
                        event.preventDefault();
                        var BB = get_blob();
                        saveAs(new BB(
                                [session.address],
                                {type: "text/plain;charset=UTF-8"}),
                                "OutdoorDownload.csv");
                        $("#" + page).modal('hide');
                        session.clear();
                    }, false);

                });
            } else {
                $("#" + page + " .btn-primary").css('display', 'none');
            }
            $("#" + page).modal({show: true});

        });
    },
    showFormBase: function () {
        var path = window.location.href.toString().split(window.location.host)[1].replace(window.location.href.toString().split(window.location.host)[1].split('/')[window.location.href.toString().split(window.location.host)[1].split('/').length - 1], "tmpl/infoModal.html");
        var fv = window.location.href.toString().split(window.location.host)[1].replace(window.location.href.toString().split(window.location.host)[1].split('/')[window.location.href.toString().split(window.location.host)[1].split('/').length - 1], "tmpl/fv.html");
        $.get(path, function (data) {
            $("body").append(data);
            $.get(fv, function (data) {
                $("#body").append(data);
            });
            $("#infoModal .btn-primary").css('display', 'none');
            $("#infoModal").on('hidden.bs.modal', function (e) {
                $("#infoModal").remove();
            });
            $("#infoModal").modal({show: true});
        });
    },
    open: function () {
        var path = window.location.href.toString().split(window.location.host)[1].replace(window.location.href.toString().split(window.location.host)[1].split('/')[window.location.href.toString().split(window.location.host)[1].split('/').length - 1], "tmpl/infoModal.html");
        var fv = window.location.href.toString().split(window.location.host)[1].replace(window.location.href.toString().split(window.location.host)[1].split('/')[window.location.href.toString().split(window.location.host)[1].split('/').length - 1], "tmpl/testSaveAs.html");
        $.get(path, function (data) {
            $("body").append(data);
            $.get(fv, function (data) {
                $("#body").append(data);
            });
            $("#infoModal").on('hidden.bs.modal', function (e) {
                $("#infoModal").remove();
            });
            $("#infoModal").modal({show: true});
        });
    }

};
