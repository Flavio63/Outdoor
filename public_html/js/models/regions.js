window.Regions = Backbone.Model.extend({
    url: "php/regioni",

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
    model: Regions

});