window.Provinces = Backbone.Model.extend({
    initialize: function(){
    
    },
    defaults: {
        idArea: "",
        idRegione: "",
        idProvincia: "",
        DescProvincia: "",
        Sigla: ""
    }
});

window.ProvincesCollection = Backbone.Collection.extend({
    url: "php/province",
    model: Provinces
});
