var rooms = [];
var _ = require('underscore');

var SocketRoute = function (app) {

    app.io.route('disconnect', function (req) {
        req.io.route('leave');
    });

    app.io.route('leave', function (req) {
        _.each(rooms, function(room) {
            roomName = _.keys(room)[0]
            roomUsers = room[roomName]

            var user = _.findWhere(roomUsers, { id: req.socket.id });

            if (user) {
                app.io.sockets.in(roomName).emit('remove:user', {
                    user: user
                });

                room[roomName] = _.without(roomUsers, _.findWhere(roomUsers, {
                    id: req.socket.id
                }));

                if (user.isOwner && room[roomName][0]) {
                    room[roomName][0].isOwner = true
                    app.io.sockets.socket(room[roomName][0].id).emit('isOwner');
                }

                req.io.leave(roomName);
            }
        })
    });

    app.io.route('ready', function(req) {
        var getRoom = _.find(rooms, req.data.roomName)
        var isOwner = false;

        if (_.isUndefined(getRoom)) {
            var room = {}
            isOwner = true;

            room[req.data.roomName] = [{
                isOwner: isOwner,
                id: req.socket.id,
                name: req.data.name,
                picture: req.data.picture,
                status: 'unstarted',
                value: ''
            }];

            rooms.push(room);
        } else {
            isOwner = _.isEmpty(getRoom[req.data.roomName])

            getRoom[req.data.roomName].push({
                isOwner: isOwner,
                id: req.socket.id,
                name: req.data.name,
                picture: req.data.picture,
                status: 'unstarted',
                value: ''
            });
        }

        req.io.join(req.data.roomName)

        if (isOwner) {
            app.io.sockets.socket(req.socket.id).emit('isOwner');
        }

        app.io.sockets.in(req.data.roomName).emit('users', {
            users: _.find(rooms, req.data.roomName)[req.data.roomName]
        });
    })
}

module.exports = SocketRoute;
