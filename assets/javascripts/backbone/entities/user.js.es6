PlanningPoker.module('Entities', (Entities, App) => {
    let users = void 0;

    class Users extends Backbone.Collection {
        initialize() {
            this.model = Entities.User;
        }
    }

    class User extends Backbone.Model {
        defaults() {
            return {
                status: 'unstarted',
                value: undefined,
            }
        }

        fetch(options) {
            if (this.isLogged()) {
                this.set($.cookie())
            } else {
                return false
            }
        }

        isLogged() {
            return !_.isEmpty($.cookie())
        }

        loggout() {
            let cookies = $.cookie();

            _.each(cookies, (value, key) => {
                $.removeCookie(key);
            });
        }
    }

    let API = {
        getUsers() {
            if (_.isUndefined(users)) {
                users = new Entities.Users();
            }

            return users;
        },

        addUsers(users) {
            this.getUsers().reset()
            this.getUsers().add(users)
        },

        removeUser(user) {
            let userModel = this.getUsers().findWhere({ name: user.name });
            this.getUsers().remove(userModel);
        },

        getUser() {
            let user = new Entities.User();
            user.fetch()
            return user;
        }
    };

    App.reqres.setHandler('users:entities', () => {
        return API.getUsers();
    });

    App.reqres.setHandler('user:entity', () => {
        return API.getUser()
    });

    socket.on('remove:user', (response) => {
        API.removeUser(response.user);
    })

    socket.on('users', (response) => {
        API.addUsers(response.users);
    });

    Entities.Users = Users;
    Entities.User = User;
})
