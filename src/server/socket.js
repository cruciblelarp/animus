/* globals require, module */

var socket = require('ws');

var http = require('./http');
var app = require('./express');
var exit = require('./exit');
var config = require('./config');

// start WebSocket server
var server = null;

function getServer() {

	if (server) {
		return server;
	}

	return server = new socket.Server({
		server: http()
	});

}

module.exports = getServer;

exit.listen(function(resolve) {

	if (!server) {
		console.log('Swarm host not created yet.');
		return resolve(config.constant.EXIT_OK);
	}

	try {
		server.close();
		return resolve(config.constant.EXIT_OK);
	} catch (error) {
		console.error(error);
		return resolve(config.constant.EXIT_SOCKET);
	}

});
