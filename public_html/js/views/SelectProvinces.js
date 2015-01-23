window.SelectProvinces = Backbone.View.extend({
    tagName: 'form',
    className: 'form-inline',
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).html(this.template());
        var provinces = this.model.models;
        var len = provinces.length;
        $('#province', this.el).append('<ol id="provinces" class="list"> </ol>');
        $("#province", this.el).accordion({collapsible: true, heightStyle: "content", active: false});        
        for (var i = 0; i < len; i++) {
            $('#provinces', this.el).append(new ProvinceItem({model: provinces[i]}).render().el);
        }
    }
});

window.ProvinceItem = Backbone.View.extend({
    tagName: 'li',
    className: 'province',
    template: _.template('<span><%= DescProvincia %> (<%= Sigla %>)</span>'),
    initialize: function(){},
    render: function(){
        var js = this.model.toJSON();
        $(this.el).attr('id', js.idProvincia);
        $(this.el).attr('data-province',{
            idArea:js.idArea, 
            idRegione:js.idRegione, 
            idProvincia:js.idProvincia, 
            descProvinca:js.descProvinca,
            Sigla:js.Sigla
        });
        $(this.el).html( this.template( js ) );
        return this;
    }
});