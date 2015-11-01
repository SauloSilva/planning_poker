PlanningPoker.module('HomeApp.Callback', (Callback, App) => {
    class Controller extends App.Controllers.Base {
        initialize() {
            let googleInfo = App.request('google:info:entity')

            App.execute('when:synchronized', googleInfo, () => {
                googleInfo.save();
            });
        }
    }

    Callback.Controller = Controller;
})
