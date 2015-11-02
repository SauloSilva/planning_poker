PlanningPoker.module('Entities', (Entities, App) => {
    let room = void 0;

    class Room extends Backbone.Model {
        open(object) {
            socket.emit('ready/foo', object)
        }

        leave() {
            socket.emit('leave');
            this.clear();
        }

        validate(attrs, options) {
            if (_.isEmpty(attrs.roomName)) {
                return "can't be blank";
            }

            if (!_.isEmpty(attrs.roomName) && attrs.roomName.length < 3) {
                return 'need to have more than 3 chars';
            }
        }
    }

    let API = {
        getRoom() {
            if (_.isUndefined(room)) {
                room = new Entities.Room();
            }

            return room;
        },

        deleteCookie() {
            this.getRoom().leave()
        }
    };

    App.reqres.setHandler('room:entity', () => {
        return API.getRoom()
    });

    Entities.Room = Room;
})
