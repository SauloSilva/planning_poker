PlanningPoker.module('Controllers', (Controllers, App) => {
    class Controller extends Marionette.Controller {
        constructor(options) {
            super(options);
        }

        onDestroy() {
            if (this.layout) {
                this.layout.destroy();
            }
        }

        show(view, options) {
            App.reqres.request('loading:wrapper', _.defaults(options, { view: view }));
        }
    }

    Controllers.Base = Controller;
});
