PlanningPoker.module('HomeApp.Index', (Index, App) => {
    class Controller extends App.Controllers.Base {
        initialize() {
            this.layout = this.getLayout();
            this.user = App.request('user:entity');
            this.users = App.request('users:entities');
            this.room = App.request('room:entity');

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
            window.foo = this.layout;

            let getInputRoomNameView = this.getInputRoomNameView();

            this.listenTo(getInputRoomNameView, 'exit:room:button:clicked', (args) => {
                args.model.leave();
                args.view.render();

                this.layout.statusRegion.empty()
                this.layout.usersRegion.empty()
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

                    this.statusRegion();
                    this.usersRegion();
                }
            });

            this.layout.inputRoomNameRegion.show(getInputRoomNameView)
        }

        buttonGoogleAuthViewRegion() {
            this.layout.buttonGoogleAuthRegion.show(this.getButtonGoogleAuthView())
        }

        statusRegion() {
            this.layout.statusRegion.show(this.getStatusView());
        }

        usersRegion() {
            this.layout.usersRegion.show(this.getUsersView());
        }

        getHomeView() {
            return new Index.HomeView();
        }

        getButtonGoogleAuthView() {
            return new Index.ButtonGoogleAuthView();
        }

        getInputRoomNameView() {
            return new Index.InputRoomNameView({
                model: this.room
            });
        }

        getStatusView() {
            return new Index.StatusView({
                model: this.room
            })
        }

        getUsersView() {
            return new Index.UsersView({
                collection: this.users
            })
        }
    };

    Index.Controller = Controller;
});
