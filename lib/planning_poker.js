module.exports = function (app, env) {
    var mincer = require(__dirname + '/planning_poker/mincer')(env);
    var connectMincer = mincer.configure();

    require(__dirname + '/planning_poker/register_helper')(connectMincer, env);
    require(__dirname + '/planning_poker/livereload')(app, env);

    return {
        connectMincer: connectMincer
    };
}
