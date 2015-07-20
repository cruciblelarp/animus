/* globals require */

var server = require('./src/server/server');

server().then(function() {
	console.log("Server is up!");
});
