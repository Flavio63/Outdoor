window.PanelForm = Backbone.View.extend({
    tagName: 'div',
    className: 'panel panel-default panel-primary',
    initialize: function(){
        this.render();
    },
    events: {
        
    },
    render: function(){
        $(this.el).html(this.template());
        
        var regionsCollection = new RegionsCollection();
        regionsCollection.fetch({
            success: function(){
                $('.form-inline').append(new SelectRegions({model: regionsCollection}).el);
            }
        });

        var provincesCollection = new ProvincesCollection({id:1});
        provincesCollection.fetch({
            success: function(){
                $('.form-inline').append(new SelectProvinces({model: provincesCollection}).el);
            }
        });

        return this;
    }
});

