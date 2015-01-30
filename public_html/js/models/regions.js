window.Regions = Backbone.Model.extend({
    //urlRoot: "php/regioni",

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