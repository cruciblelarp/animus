/* globals require, process, JSON, console */

var config = require('./src/server/config');

console.log('process.env: ' + JSON.stringify(process.env, null));
console.log('config: ' + JSON.stringify(config, null));

// Load up all the rest endpoints.
require('./src/server/rest');

// start the server.
require('./src/server/express').listen(config.port, function() {
	console.log('Starting application on port ' + config.port);

}).on('error', function(error) {
	console.error(error.stack);

});
