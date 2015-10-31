const PlanningPoker = ((Backbone, Marionette) => {
    let App = new Marionette.Application();

    App.addRegions({
        mainRegion: 'main'
    });

    App.addInitializer(() => {
    });

    App.on('start', () => {
        console.log('--- started ---')
    });

    return App;
})(Backbone, Marionette);
