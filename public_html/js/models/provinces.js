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
    url: "php/province",
    model: Provinces
});
