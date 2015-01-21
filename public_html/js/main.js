var AppRouter = Backbone.Router.extend({
    routes: {
        "map_menu": "map_menu",
        "db_menu": "db_menu",
        "regioni/list": "list"
    },
    initialize: function () {
        this.headerView = new HeaderView();
        $('#fvNavBar').html(this.headerView.el);
    },
    map_menu: function(){
        this.menu_map = new menu_Map();
        $('#menuMapNavBar').html(this.menu_map.el);

        this.googlemap = new googleMap();
        $('#contenitore').html(this.googlemap.el);
        $("#googleMap").show();
        $("#googleMap").height($(window).height() - $("#googleMap").offset().top + ($("#googleMap").outerHeight(true) - $("#googleMap").height()));
    },
    db_menu: function(){
        var regionsCollection = new RegionsCollection();
        regionsCollection.fetch({
            success: function(){
                $("#contenitore").append(new SelectForm({model: regionsCollection}).el);
            }
        });
    }
});

utils.loadTemplate(['HeaderView', 'menu_Map', 'googleMap', 'SelectForm', 'RegionItem'], function () {
    app = new AppRouter();
    Backbone.history.start();
});
