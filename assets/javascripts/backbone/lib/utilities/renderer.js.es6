PlanningPoker.module('Utilities', (Utilities, App, Backbone, Marionette, $, _) => {
    let API = {
        lookups() {
            return [
                'backbone/apps',
                'backbone/lib/components'
            ];
        },

        render(template, data) {
            if (!template) {
                return;
            }

            let templatePath = API.getTemplatePath(template);

            if (templatePath) {
                let template = JST[templatePath];
                _.extend(data, API.helpers(templatePath));
                return template(data);
            } else {
                throw `Template ${ template } not found!`;
            }
        },

        getTemplate(template) {
            return JST[API.getTemplatePath(template)];
        },

        getTemplatePath(template) {
            for(let lookup of API.lookups()) {
                let path = `${ lookup }/${ template }`;

                if (JST[path]) {
                    return path;
                }
            }
        },

        renderer() {
            _.extend(Marionette.Renderer, { render: API.render });
        },

        helpers(templatePath) {
            let helpers = [Utilities.Routes];

            let methods = {};

            for (let helper of helpers) {
                _.extend(methods, helper);
            }

            return methods;
        }
    };

    Utilities.on('start', () => {
        API.renderer();
    });
});
