PlanningPoker.module('Components.Loading', (Loading, App, Backbone, Marionette) => {
    class LoadView extends Marionette.ItemView {
        initialize() {
            this.template = false;
        }

        className() {
            return this.options.className;
        }
    };

    Loading.LoadView = LoadView;
});
