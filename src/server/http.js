/* globals require, module */

var http = require('http');

var app = require('./express');
var exit = require('./exit');
var config = require('./config');

var Server = http.Server;

// create and start the HTTP server with static file serving.
var server = module.exports = new Server(app);

exit.listen(function(resolve) {

	if (!server) {
		console.log('Http server has not been created.');
		return resolve(config.constant.EXIT_OK);
	}

	try {
		server.close();
		return resolve(config.constant.EXIT_OK);
	} catch (error) {
		console.error(error);
		resolve(config.constant.EXIT_HTTP);
	}

});
