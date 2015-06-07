/* globals require, module */

var socket = require('socket.io');
var socketSession = require('socket.io-express-session');

var http = require('./http');
var app = require('./express');
var exit = require('./exit');
var config = require('./config');

var server = null;

module.exports = function() {

	if (server) {
		console.debug('Retrieving existing server instance.');
		return server;
	}

	console.info('Creating new socket server.');

	server = socket(http);

	server.use(socketSession(app.session));

	server.on('connection', function(socket) {
		var sessionId = socket.handshake.session;
		console.debug('Session connect: ' + sessionId);
		socket.on('disconnect', function() {
			console.debug('Session disconnect: ' + sessionId);
		});
	});

};

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
