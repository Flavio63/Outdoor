window.Provinces = new Backbone.Model.extend({
    urlRoot: "php/province",
    initialize: function(){
        
    },
    defaults: {
        idArea: "",
        idRegione: "",
        DescProvincia: "",
        Sigla: ""
    }
});

window.ProvincesCollection = new Backbone.Collection.extend({
    urlRoot: "php/province",
    model: Provinces
});
