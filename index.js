/* globals require, process, JSON, console */

process.nextTick(function() {
	console.log('process.env: ' + JSON.stringify(process.env, null));
	console.log('config: ' + JSON.stringify(require('./src/server/config'), null));
});

var server = require('./src/server/server');

server().then(function(stop) {
	console.log("Server is up!");
}, function(error) {
	console.error(error.stack);
	process.exit(1);
});
