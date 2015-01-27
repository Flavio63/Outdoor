window.Regions = Backbone.Model.extend({
    urlRoot: "php/regioni",

    initialize: function () {
    },

    defaults: {
        idArea: "",
        idRegione: "",
        DescRegione: ""
    }
});

window.RegionsCollection = Backbone.Collection.extend({

    url: "php/regioni",
    model: Regions /*,
    getCustomUrl: function(method){
        switch(method){
            case 'read':
                return 'http://flavilla.altervista.org/lib/php/regioni';
                break;
        }
    },
    sync: function (method, model, options){
        options || (options = {});
        options.emulateJSON = true;
        options.url = this.getCustomUrl(method.toLowerCase());
        return Backbone.sync.apply(this, arguments); 
    }*/

});