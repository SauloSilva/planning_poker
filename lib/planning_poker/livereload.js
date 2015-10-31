module.exports = function(app, env) {
    if (env === 'development') {
        var livereload = require('express-livereload');

        // livereload(app, {
        //     watchDir: process.cwd() + '/assets/',
        //     exts: ['sass', 'es6']
        // });
    }
};
