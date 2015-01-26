window.SelectRegions = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    initialize: function(){
        this.$el.click(this.jQueryClicked);
        this.render();
    },
    events: {
        'click [type="li"]': 'clicked'
    },
    // this is handling DOM element
    jQueryClicked: function(event){
        //console.log("jQuery handler for " + this.outerHTML);
    },
    clicked: function(){
        console.info("events handler for " + this.el.innerHTML);
    },
    render: function(){
        $(this.el).html(this.template());
        var regions = this.model.models;
        var len = regions.length;
        $('#territorio', this.el).append('<ol id="regions" class="list"> </ol>');
        $("#territorio", this.el).accordion({collapsible: true, heightStyle: "content", active: false});        
        for (var i = 0; i < len; i++) {
            $('#regions', this.el).append(new RegionItem({model: regions[i]}).render().el);
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

window.RegionItem = Backbone.View.extend({
    tagName: 'li',
    className: 'region',
    template:  _.template('<span><%= DescRegione %></span>'),
    initialize: function(){},
    render: function(){
        var js = this.model.toJSON();
        $(this.el).attr('id', js.idRegione);
        $(this.el).html( this.template( js ) );
        return this;
    }
});
