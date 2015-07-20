/* globals require, process, JSON, console */

console.log('Config and ');
console.log('process.env: ' + JSON.stringify(process.env, null, '\t'));
console.log('config: ' + JSON.stringify(require('./src/server/config'), null, '\t'));

var server = require('./src/server/server');

server().then(function(stop) {
	console.log("Server is up!");
}, function(error) {
	console.error(error.stack);
	process.exit(1);
});
