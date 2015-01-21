window.RegionListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var region = this.model.models;
        var len = region.length;

        $(this.el).html('<ul class="myList"> </ul>');

        for (var i = 0; i < len; i++) {
            $('.myList', this.el).append(new RegionListItemView({model: region[i]}).render().el);
        }

        return this;
    }
});

window.RegionListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});