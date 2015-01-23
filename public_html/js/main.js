var AppRouter = Backbone.Router.extend({
    routes: {
        "map_menu": "map_menu",
        "db_menu": "db_menu"
    },
    initialize: function () {
        this.headerView = new HeaderView();
        $('#fvNavBar').html(this.headerView.el);
    },
    map_menu: function(){
        this.menu_map = new menu_Map();
        $('#menuMapNavBar').html(this.menu_map.el);

        this.gmap = new googleMap();
        $('#contenitore').html(this.gmap.el);
        $("#googleMap").show();
        $("#googleMap").height($(window).height() - $("#googleMap").offset().top + ($("#googleMap").outerHeight(true) - $("#googleMap").height()));
    },
    db_menu: function(){
        this.panelForm = new PanelForm();
        $('#contenitore').html(this.panelForm.el);
    }
});

utils.loadTemplate(['HeaderView', 'menu_Map', 'PanelForm', 'SelectRegions', 'SelectProvinces'], function () {
    app = new AppRouter();
    Backbone.history.start();
});
