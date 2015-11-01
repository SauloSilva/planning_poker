PlanningPoker.module('HomeApp.Index', (Index, App, Backbone, Marionette) => {
    class LayoutView extends Marionette.LayoutView {
        initialize() {
            this.template = 'home/index/templates/layout';
            this.addRegions({
                homeRegion: '.home-region'
            })
        }
    }

    class HomeView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/home';
        }
    }

    Index.LayoutView = LayoutView;
    Index.HomeView = HomeView;
});
