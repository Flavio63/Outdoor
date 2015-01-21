window.RegionList = Backbone.View.extend({
    className: 'inlinea',
    initialize: function(){
        this.render();
    },
    render: function(){
        var regions = this.model.models;
        var len = regions.length;
//        $(this.el).prepend("<h2><bold>Regioni</bold></h2><ol id='regioni-selezionato'></ol>");
        $(this.el).html('<ol id="regions" class="list"> </ol>');
        
        for (var i = 0; i < len; i++) {
            $('#regions', this.el).append(new RegionItem({model: regions[i]}).render().el);
        }
/*        $("#regions").selectable({
        stop: function(){
            var resultLi = $("#regioni-selezionato");
            resultLi.children().remove();
            $(".ui-selected", this).each(function () {
                resultLi.append('<li class="region">' + $(this).text() + '</li>');
            });
        }
    });
*/        return this;
    }
});

window.RegionItem = Backbone.View.extend({
    tagName: 'li',
    className: 'region',
    initialize: function(){
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
    render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});