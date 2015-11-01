PlanningPoker.module('Entities', (Entities, App) => {
    class Users extends Backbone.Collection {
        model() {
            return Entities.User;
        }
    }

    class User extends Backbone.Model {
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
        getUser() {
            let user = new Entities.User();
            user.fetch()
            return user;
        }
    };

    App.reqres.setHandler('user:entity', () => {
        return API.getUser()
    });

    Entities.Users = Users;
    Entities.User = User;
})
