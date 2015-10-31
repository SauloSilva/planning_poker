module.exports = function(connectMincer, env) {
    var glob = require('glob');
    var extend = require('node.extend');
    var settings = require(process.cwd() + '/config/settings.json')[env];
    var environment = connectMincer;

    if (connectMincer.environment) {
        environment = connectMincer.environment;
    }

    // Settings
    environment.registerHelper('settings', function() {
        extend(true, settings, { environment: env });
        return JSON.stringify(settings);
    });

    // Assets Path
    environment.registerHelper('asset_path', function(name, opts) {
      var asset = environment.findAsset(name, opts);

      if (!asset){
        throw new Error('File [' + name + '] not found');
      }

      return '/assets/' + asset.digestPath;
    });
}
