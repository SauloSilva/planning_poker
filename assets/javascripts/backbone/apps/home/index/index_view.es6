PlanningPoker.module('HomeApp.Index', (Index, App, Backbone, Marionette) => {
    class LayoutView extends Marionette.LayoutView {
        initialize() {
            this.template = 'home/index/templates/layout';
            this.addRegions({
                homeRegion: '.home-region',
                buttonGoogleAuthRegion: '.button-google-auth-region',
                inputRoomNameRegion: '.input-room-name-region',
                statusRegion: '.status-region',
                usersRegion: '.users-region'
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

    class UserView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/user';
        }

        templateHelpers() {
            return {
                text(status, value) {
                    if (_.isEqual(status, 'showed')) {
                        return value;
                    }
                }
            }
        }
    }

    class UsersView extends Marionette.CollectionView {
        initialize() {
            this.childView = Index.UserView;
        }
    }

    class StatusView extends Marionette.ItemView {
        initialize() {
            this.template = 'home/index/templates/status';
        }

        modelEvents() {
            return {
                'change:isOwner': 'render',
                'change:status': 'render'
            }
        }

        templateHelpers() {
            return {
                className(status) {
                    let value;

                    switch (status) {
                      case 'unstarted':
                        value = 'start'
                        break;
                      case 'allAnswered':
                        value = 'show'
                        break;
                      case 'allAnswered':
                        value = 'next'
                    }

                    console.log('linkClassName', value, status)
                    return value;
                },

                text(status) {
                    let value;

                    switch (status) {
                      case 'unstarted':
                        value = 'Start'
                        break;
                      case 'allAnswered':
                        value = 'Show results'
                        break;
                      case 'allAnswered':
                        value = 'Next'
                    }

                    console.log('linkText', value, status)

                    return value;
                }
            }
        }
    }

    Index.LayoutView = LayoutView;
    Index.HomeView = HomeView;
    Index.ButtonGoogleAuthView = ButtonGoogleAuthView;
    Index.InputRoomNameView = InputRoomNameView;
    Index.UserView = UserView;
    Index.UsersView = UsersView;
    Index.StatusView = StatusView;
});
