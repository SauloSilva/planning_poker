Skore.module('Components.Loading', (Loading, App, Backbone, Marionette) => {
    class LoadView extends App.Views.ItemView {
        initialize() {
            this.template = false;
        }

        className() {
            return this.options.className;
        }
    };

    Loading.LoadView = LoadView;
});
