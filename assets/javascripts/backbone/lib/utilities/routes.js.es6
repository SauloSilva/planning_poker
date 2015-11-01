PlanningPoker.module('Utilities', (Utilities, App, Backbone, Marionette, $, _) => {
    let API = {
        rootPath() {
            return API.pathTo('/');
        },

        pathTo(route, params = {}) {
            return App.pathTo(route, params);
        },

        urlFor(route, params = {}) {
            return App.urlFor(route, params);
        },

        start(){
            Utilities.Routes = API;
        }
    };

    Utilities.on('start', () => {
        API.start()
    });
});
