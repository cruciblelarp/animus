/* globals require, process, JSON, console */

var traceur = require('traceur');

require('traceur-source-maps').install(traceur);
traceur.require.makeDefault(function (filePath) {
	return !~filePath.indexOf('node_modules');
});

var config = require('./src/server/config');

console.log('process.env: ' + JSON.stringify(process.env, null));
console.log('config: ' + JSON.stringify(config, null));

// start the server.
require('./src/server/server').start().catch(function(error) {
	console.error(error.stack);

});
