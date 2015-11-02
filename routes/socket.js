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

                console.log(rooms, 'delete before');

                room[roomName] = _.without(roomUsers, _.findWhere(roomUsers, {
                    id: req.socket.id
                }));

                console.log(rooms, 'delete after');

                req.io.leave(roomName);
            }
        })
    });

    app.io.route('ready/foo', function(req) {
        var getRoom = _.find(rooms, req.data.roomName)

        if (_.isUndefined(getRoom)) {
            var room = {}

            console.log('if---')
            room[req.data.roomName] = [{
                isOwner: true,
                id: req.socket.id,
                name: req.data.name,
                picture: req.data.picture
            }];

            rooms.push(room);
        } else {
            console.log(getRoom[req.data.roomName], 'users---before')
            getRoom[req.data.roomName].push({
                id: req.socket.id,
                name: req.data.name,
                picture: req.data.picture
            });
            console.log(getRoom[req.data.roomName], 'users---after')
        }


        req.io.join(req.data.roomName)

        console.log('add');

        app.io.sockets.in(req.data.roomName).emit('users', {
            users: _.find(rooms, req.data.roomName)[req.data.roomName]
        });
    })
}

module.exports = SocketRoute;
