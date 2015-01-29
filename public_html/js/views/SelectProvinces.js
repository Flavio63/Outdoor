window.SelectProvinces = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
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
            $('#provinces', this.el).append(new ProvinceItem({model: provinces[i]}).render().el);
        }
        $("#provinces", this.el).selectable(this.selections);
        return this;
    },
    selections: {
        stop: function (e) {
            var resultLi = $("#provinces-selected");
            resultLi.children().remove();
            $(".ui-selected", this).each(function () {
            var a = $(this).attr('idarea'), b = $(this).attr('idregione'),
                    c = $(this).attr('id'), d = $(this).attr('descprovincia'),
                    e = $(this).attr('sigla');
                resultLi.append('<li class="province">' + a + ">" + b + ">" + c + ">" + d + ">" + e + '</li>');
            });

        }
    }

});

window.ProvinceItem = Backbone.View.extend({
    tagName: 'li',
    className: 'province',
    template: _.template('<%= DescProvincia %> (<%= Sigla %>)'),
    initialize: function(){},
    render: function(){
        var js = this.model.toJSON();
        $(this.el).attr('id', js.idProvincia);
        $(this.el).attr({
            idarea:js.idArea, 
            idregione:js.idRegione, 
            idprovincia:js.idProvincia, 
            descprovincia:js.DescProvincia,
            sigla:js.Sigla
        });
        $(this.el).html( this.template( js ) );
        return this;
    }
});