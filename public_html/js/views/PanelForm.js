window.PanelForm = Backbone.View.extend({
    tagName: 'div',
    className: 'panel panel-default panel-primary',
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).html(this.template());
        var regionsCollection = new RegionsCollection();
        regionsCollection.fetch({
            success: function(){
                $(".panel-body").append(new SelectRegions({model: regionsCollection}).el);
            }
        });

        var provincesCollection = new ProvincesCollection();
        provincesCollection.fetch({
            success: function(){
                $(".panel-body").append(new SelectProvinces({model: provincesCollection}).el);
            }
        });

        return this;
    }
});

