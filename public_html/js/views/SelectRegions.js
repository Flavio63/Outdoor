window.SelectRegions = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    initialize: function(){
        //this.$el.click(this.jQueryClicked);
        this.render();
    },
    events: {
        'click #territorio': 'clicked'
    },
    // this is handling DOM element
    jQueryClicked: function(event){
        console.log("jQuery handler for " + this.outerHTML);
    },
    clicked: function(){
        console.info(JSON.stringify(selReg));
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
        $("#regions", this.el).selectable(this.selections);
        return this;
    },
    selections: {
        stop: function (e) {
            selReg = [];
            var resultLi = $("#regions-selected");
            resultLi.children().remove();
            $(".ui-selected", this).each(function () {
                selReg.push({
                    idArea:$(this).attr('idarea'),
                    idRegione: $(this).attr('id'),
                    DescRegione: $(this).attr('descregione')
                });
            var t = $(this).attr('idarea') + ">" + $(this).attr('id') + ">" + $(this).attr('descregione');
                resultLi.append('<li class="region">' + t + '</li>');
            });

        }
    }
    
});
var selReg = [];

window.RegionItem = Backbone.View.extend({
    tagName: 'li',
    className: 'region',
    template:  _.template('<%= DescRegione %>'),
    initialize: function(){},
    render: function(){
        var js = this.model.toJSON();
        $(this.el).attr('id', js.idRegione);
        $(this.el).attr({
            idarea:js.idArea,
            descregione:js.DescRegione
        });
        $(this.el).html( this.template( js ) );
        return this;
    }
});
