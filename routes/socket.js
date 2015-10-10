var users = [];

var SocketRoute = function (app) {

  app.io.route('ready', function(req) {
      req.io.join(req.data)
      req.io.room(req.data).broadcast('announce', {
          message: 'New client in the ' + req.data + ' room. '
      })
  })
}

module.exports = SocketRoute;