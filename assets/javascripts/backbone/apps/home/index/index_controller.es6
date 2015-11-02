PlanningPoker.module('HomeApp.Index', (Index, App) => {
    class Controller extends App.Controllers.Base {
        initialize() {
            this.layout = this.getLayout();
            this.user = App.request('user:entity');

            this.listenTo(this.layout, 'show', () => {
                App.execute('when:synchronized', this.user, () => {
                    this.handlerRegions();
                })
            });

            App.mainRegion.show(this.layout);
        }

        getLayout() {
            return new Index.LayoutView();
        }

        handlerRegions() {
            if (this.user.isLogged()) {
                this.homeRegion();
                this.inputRoomNameRegion();
            } else {
                this.buttonGoogleAuthViewRegion();
            }
        }

        homeRegion() {
          this.layout.homeRegion.show(this.getHomeView())
        }

        inputRoomNameRegion() {
            let getInputRoomNameView = this.getInputRoomNameView();

            this.listenTo(getInputRoomNameView, 'exit:room:button:clicked', (args) => {
                args.model.leave();
                args.view.render();
            });

            this.listenTo(getInputRoomNameView, 'form:submitted', (args) => {
                let object = Backbone.Syphon.serialize(args.view);
                let attributesModel = { roomName: _.slugify(object.roomName) };
                args.model.set(attributesModel);

                if (args.model.isValid(attributesModel)) {

                    args.model.open(_.extend(attributesModel, {
                        name: this.user.get('name'),
                        picture: this.user.get('picture')
                    }));

                    args.view.render();
                }
            });

            this.layout.inputRoomNameRegion.show(getInputRoomNameView)
        }

        buttonGoogleAuthViewRegion() {
            this.layout.buttonGoogleAuthRegion.show(this.getButtonGoogleAuthView())
        }

        getHomeView() {
            return new Index.HomeView();
        }

        getButtonGoogleAuthView() {
            return new Index.ButtonGoogleAuthView();
        }

        getInputRoomNameView() {
            return new Index.InputRoomNameView({
                model: App.request('room:entity')
            });
        }
    };

    Index.Controller = Controller;
});
