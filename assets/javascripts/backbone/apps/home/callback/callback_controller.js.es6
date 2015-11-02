PlanningPoker.module('HomeApp.Callback', (Callback, App) => {
    class Controller extends App.Controllers.Base {
        initialize() {
            let googleInfo = App.request('google:info:entity')

            App.execute('when:synchronized', googleInfo, () => {
                googleInfo.save();

                App.vent.trigger('visit:home');
            });
        }
    }

    Callback.Controller = Controller;
})
