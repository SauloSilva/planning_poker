PlanningPoker.module('HomeApp.Index', (Index, App, Backbone, Marionette) => {
    class LayoutView extends Marionette.LayoutView {
        initialize() {
            this.template = 'home/index/templates/layout';
            this.addRegions({
                homeRegion: '.home-region',
                buttonGoogleAuthRegion: '.button-google-auth-region',
                inputRoomNameRegion: '.input-room-name-region'
            })
        }
    }

    class ButtonGoogleAuthView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/button_google_auth';
        }
    }

    class HomeView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/home';
        }
    }

    class InputRoomNameView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/input_room_name';
        }

        ui() {
            return {
                'errorMessage': '.error-message',
                'exitRoomButton': '.exit-room',
                'input': 'input[type=text]'
            }
        }

        templateHelpers() {
            return {
                isDisabled(roomName) {
                    if (!_.isEmpty(roomName)) {
                        return 'disabled';
                    }
                }
            }
        }

        triggers() {
            return {
                'submit': 'form:submitted',
                'click @ui.exitRoomButton': 'exit:room:button:clicked'
            }
        }

        modelEvents() {
            return {
                'invalid': 'addErrors'
            }
        }

        addErrors(model, errorMessage) {
            this.ui.errorMessage.text(errorMessage);
        }
    }

    Index.LayoutView = LayoutView;
    Index.HomeView = HomeView;
    Index.ButtonGoogleAuthView = ButtonGoogleAuthView;
    Index.InputRoomNameView = InputRoomNameView;
});
