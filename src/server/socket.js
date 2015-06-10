/* globals require, module */

var _ = require('underscore');
var socket = require('socket.io');
var socketSession = require('socket.io-express-session');

var http = require('./http');
var app = require('./express');
var exit = require('./exit');
var config = require('./config');
var model = require('./model');

var server = module.exports = socket(http);

server.use(socketSession(app.session));

server.listen(http, {
	log: true
});

var listeners = [];
var reactors = [];

server.$listen = function(event, callback) {
	listeners.push({
		event: event,
		callback: callback
	});
};

server.$react = function(callback) {
	reactors.push(callback);
};

server.on('connection', function(socket) {

	var session = socket.handshake.session;
	console.log(session.id + ': connected');

	var data = model(session);

	_.each(listeners, function(listener) {
		socket.on(listener.event, function() {

			var newargs = [ socket, data ].concat(_.collect(arguments, function(argument) {
				return argument;
			}));

			listener.callback.apply(listener, newargs);

		});
	});

	_.each(reactors, function(reactor) {
		reactor.call(reactor, data, socket);
	});

	socket.on('disconnect', function() {
		console.log(session.id + ': disconnected');
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
