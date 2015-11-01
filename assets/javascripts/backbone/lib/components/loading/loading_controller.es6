PlanningPoker.module('Components.Loading', (Loading, App) => {
    class ComponentsLoadingController extends App.Controllers.Base {
        initialize(options) {
            _.defaults(options, {
                loadingClass: 'loading',
                entities: false
            });

            this.options = options;
            this.getLoadingViewRegion();
        }

        getLoadingViewRegion() {
            if (!this.options.entities) {
                this.showView();
            } else {
                this.options.region.show(this.getLoadingView());

                App.execute('when:synchronized', this.options.entities, () => {
                    this.showView();
                });
            }
        }

        showView() {
            this.options.region.show(this.options.view);

            requestAnimationFrame(() => {
                this.destroy();
            })
        }

        getLoadingView() {
            return new Loading.LoadView({ className: this.options.loadingClass });
        }
    };

    App.reqres.setHandler('loading:wrapper', (options) => {
        return new Loading.Controller(options);
    });

    Loading.Controller = ComponentsLoadingController;
});
