window.HeaderView = Backbone.View.extend({
    tagName: 'div',
    className: 'container-fluid',
    initialize: function () {
        this.render();
    },
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }
});