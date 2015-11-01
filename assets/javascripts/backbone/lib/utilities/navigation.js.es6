PlanningPoker.module('Utilities', (Utilities, App, Backbone, Marionette, $, _) => {
    let API = {
        navigate(path, options) {
            let route = path ? path : '/';

            if (_.isNull(options)) {
                options = {};
            }

            route = this.pathTo(route);
            Backbone.history.navigate(route, options);
        },

        getCurrentRoute() {
            let frag = Backbone.history.fragment;

            if (_.isEmpty(frag)) {
                return null;
            } else {
                return frag;
            }
        },

        pathTo(route, params = {}) {
            if (_.isNull(route)) {
                route = '/';
            }

            if (route.slice(0) !== '/') {
                route = `/${ route }`;
            }

            if (route.slice(-1) !== '/') {
                route = `${ route }/`;
            }

            route = route.replace(/\/\//g, '/');

            if (_.isEmpty(params)) {
                return route
            } else {
                return `${ route }?${ $.param(params) }`
            }
        },

        urlFor(route, params = {}) {
            route = this.pathTo(route, params);
            return `${ location.protocol }//${ location.host }${ route }`
        },

        startHistory() {
            if (Backbone.history) {
                Backbone.history.start({ pushState: true });
                console.log('----- startHistory -----');
            }

            $(document).on('click', 'a[data-internal]', (event) => {
                event.preventDefault();
            })
        },

        navigateToBack() {
            Backbone.history.history.back();
        }
    };

    Utilities.on('start', () => {
        _.extend(App, API)
    });

    App.vent.on('visit', (path, options) => {
        API.navigate(path, options);
    });
});
