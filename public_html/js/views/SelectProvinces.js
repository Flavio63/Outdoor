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
        $('#terProvinces', this.el).append('<ol id="provinces" class="list"> </ol>');
        $("#terProvinces", this.el).accordion({collapsible: true, heightStyle: "content", active: false});        
        for (var i = 0; i < len; i++) {
            $('#provinces', this.el).append(new ProvinceItem({model: regions[i]}).render().el);
        }
        $("#regions", this.el).selectable({
            filter: 'li',
            stop: function(){
                var resultLi = $("#regions-selected");
                resultLi.children().remove();
                $(".ui-selected", this).each(function () {
                resultLi.append('<li class="region">' + $(this).text() + '</li>');
                console.info('idRegione: ' + this.id);
            });
            }
        });
        return this;
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