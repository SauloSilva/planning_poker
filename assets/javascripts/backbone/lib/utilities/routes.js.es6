PlanningPoker.module('Utilities', (Utilities, App, Backbone, Marionette, $, _) => {
    let API = {
        rootPath() {
            return API.pathTo('/');
        },

        googleAuthPath() {
            return 'https://accounts.google.com/o/oauth2/auth' +
                '?client_id=523974958360-5jlctnjo1glfhv804vrb11gh7nbaert3.apps.googleusercontent.com' +
                '&redirect_uri=http://planningpoker.com:3000/callback' +
                '&response_type=token&scope=email'
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
