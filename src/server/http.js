/* globals require, module */

var http = require('http');

var app = require('./express');
var exit = require('./exit');
var config = require('./config');

// create and start the HTTP server with static file serving.
var httpServer = null;

function getServer() {

	if (httpServer) {
		return httpServer;
	}

	return httpServer = http.createServer(app);

}

module.exports = getServer;

exit.listen(function(resolve) {

	if (!httpServer) {
		console.log('Http server has not been created.');
		return resolve(config.constant.EXIT_OK);
	}

	try {
		httpServer.close();
		return resolve(config.constant.EXIT_OK);
	} catch (error) {
		console.error(error);
		resolve(config.constant.EXIT_HTTP);
	}

});
