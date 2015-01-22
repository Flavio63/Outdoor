window.PanelForm = Backbone.View.extend({
    tagName: 'div',
    className: 'panel panel-default panel-primary',
    initialize: function(){
        this.render();
    },
    render: function(){
        var regionsCollection = new RegionsCollection();
        $(this.el).html(this.template());
        regionsCollection.fetch({
            success: function(){
                $(".panel-body").append(new SelectRegions({model: regionsCollection}).el);
            }
        });
        return this;
    }
});

