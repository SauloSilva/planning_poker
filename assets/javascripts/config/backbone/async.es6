(Backbone => {
    let _sync = Backbone.sync, methods = {
            beforeSend() {
                this.trigger('sync:start', this);
            },
            complete() {
                this.trigger('sync:stop', this);
            }
        };

    Backbone.sync = function (method, entity, options) {
        if (options === null) {
            options = {};
        }

        if (!options.crossDomain) {
           options.crossDomain = true;
        }

        if (!options.xhrFields) {
          options.xhrFields = { withCredentials: true };
        }

        _.defaults(options, {
            beforeSend: _.bind(methods.beforeSend, entity),
            complete: _.bind(methods.complete, entity)
        });

        let sync = _sync(method, entity, options);

        if (!entity._sync && _.include(['read', 'update', 'delete', 'create'], method)) {
            entity._sync = sync;
        }

        return sync;
    };
})(Backbone);
