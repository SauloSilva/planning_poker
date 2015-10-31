module.exports = function(env) {
    var Mincer = require('mincer');

    require('mincer-babel')(Mincer);
    var ConnectMincer = require('connect-mincer');

    var configure = function() {
        var connectMincer = new ConnectMincer({
            mincer: Mincer,
            root: process.cwd(),
            production: env === 'production',
            mountPoint: '/assets',
            manifestFile: process.cwd() + '/public/assets/manifest.json',
            paths: [
                'assets/images',
                'assets/stylesheets',
                'vendor/assets/stylesheets',
                'assets/javascripts',
                'vendor/assets/javascripts',
                'vendor/assets/javascripts/bower_components'
            ]
        });
        connectMincer.environment.cache = new Mincer.FileStore(process.cwd() + '/tmp');
        return connectMincer;
    };

    return {
        configure: configure
    };
};
