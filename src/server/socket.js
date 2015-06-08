/* globals require, module */

var socket = require('socket.io');
var socketSession = require('socket.io-express-session');

var http = require('./http');
var app = require('./express');
var exit = require('./exit');
var config = require('./config');

var server = module.exports = socket(http);

server.use(socketSession(app.session));

server.listen(http, {
	log: true
});

server.on('connection', function(socket) {
	var sessionId = socket.handshake.session.id;
	console.log(sessionId + ': connected');
	socket.on('disconnect', function() {
		console.log(sessionId + ': disconnected');
	});
});

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
