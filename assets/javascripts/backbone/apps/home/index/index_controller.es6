PlanningPoker.module('HomeApp.Index', (Index, App) => {
    class Controller extends App.Controllers.Base {
        initialize() {
            this.layout = this.getLayout();

            this.listenTo(this.layout, 'show', () => {
                this.homeRegion();
            });

            App.mainRegion.show(this.layout);
        }

        getLayout() {
            return new Index.LayoutView();
        }

        homeRegion() {
          this.layout.homeRegion.show(this.getHomeView())
        }

        getHomeView() {
            return new Index.HomeView();
        }
    };

    Index.Controller = Controller;
});
