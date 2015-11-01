PlanningPoker.module('HomeApp', (HomeApp, App, Backbone, Marionette) => {
    HomeApp.startWithParent = false;

    class Router extends Marionette.AppRouter {
        initialize() {
            this.appRoutes = {
                '': 'home',
                'callback': 'callback'
            }
        }
    }

    let API = {
        callback() {
            new HomeApp.Callback.Controller();
        },

        home() {
            new HomeApp.Index.Controller();
        }
    };

    HomeApp.on('start', () => {
        return new HomeApp.Router({ controller: API });
    });

    App.vent.on('visit:home', () => {
        App.vent.trigger('visit', App.Utilities.Routes.rootPath());
        API.home();
    });

    HomeApp.Router = Router;
});
