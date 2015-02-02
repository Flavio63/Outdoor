window.Regions = Backbone.Model.extend({
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