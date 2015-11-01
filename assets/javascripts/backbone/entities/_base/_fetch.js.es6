PlanningPoker.module('Entities', (Entities, App, Backbone, Marionette, $, _) => {
    App.commands.setHandler('when:synchronized', (entities, callback, callbackFail) => {
        entities = _.flatten([entities]);
        let xhrs = _.chain(entities).pluck('_sync').value();

        $.when.apply($, xhrs)
            .done(() => {
                for (let entity of entities) {
                    if (entity && entity._sync) {
                        entity._sync = null;
                    }
                }
                callback();
            })
            .fail((a) => {
                if (callbackFail) {
                    callbackFail(a);
                }
            });
    });
});
