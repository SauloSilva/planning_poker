const PlanningPoker = ((Backbone, Marionette) => {
    let App = new Marionette.Application();

    App.addRegions({
        mainRegion: 'main'
    });

    App.addInitializer(() => {
        App.module('Utilities').start();

        App.module('HomeApp').start();
    });

    App.on('start', () => {
        App.startHistory();
    });

    return App;
})(Backbone, Marionette);
