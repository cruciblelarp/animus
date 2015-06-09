/* globals require, module */

var _ = require('underscore');
var assert = require('assert');
var crypto = require('crypto');
var Promise = require('promise');

var query = require('./neo4j');
var socket = require('./socket');

socket.use(function(socket, next) {
	var sessionId = socket.handshake.session.id;

	socket.on('login', function(data) {
		console.log(sessionId + ': Attempting authentication');

		var email = data.email;
		var password = data.password;

		// validate request
		assert(email != null);
		assert(password != null);

		return query('MATCH (user:User { email: {email} }) RETURN user;', {
			email: email
		}).then(function(results) {

			var result = _.first(results);
			var node = result && result.user;
			var user = node && node.properties;

			if (!user) {
				return Promise.reject(404);
			}

			// run crypto hash on supplied password.
			var hash = crypto.createHash('md5')
				.update(password)
				.digest('hex');

			if (hash !== user.password) {
				return Promise.reject(400);
			}

			var token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

			_.extend(socket.handshake.session, {
				userId: node._id,
				token: token
			});

			console.log(sessionId + ': Authentication successful');
			socket.emit('login', {
				status: 200,
				token: token
			});

		}).catch(function(error) {

			if (error && _.isNumber(error)) {
				return socket.emit('login', {
					status: error,
					message: 'Authentication failed.'
				});
			}

			console.error(sessionId + ': ' + error.stack);
			return socket.emit('login', {
				status: 500,
				message: error.message
			});

		}).done(function() {
			console.log(sessionId + ': Login request complete.');
		}, function(error) {
			console.error(sessionId + ': ' + error.stack);
			socket.emit('auth', {
				status: 500,
				message: error.message
			});
		});

	});

	return next();

});

