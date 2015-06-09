/* globals require, module */

var _ = require('underscore');
var assert = require('assert');
var crypto = require('crypto');
var Promise = require('promise');

var mongo = require('./mongo');
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

		var user = null;
		var token = null;
		var conn = null;

		return mongo().then(function(db) {

			conn = db;

			return conn.collection('users');

		}).then(function(users) {

			return users.findOne({
				email: email
			});

		}).then(function(user_record) {

			if (!user_record) {
				return Promise.reject(404);
			}

			user  = user_record;

			return conn.collection('passwords');

		}).then(function(passwords) {

			return passwords.findOne({
				_id: user.password
			});

		}).then(function(password_record) {

			if (!password_record) {
				return Promise.reject(404);
			}

			// run crypto hash on supplied password.
			var hash = crypto.createHash('md5')
				.update(password)
				.digest('hex');

			if (hash !== password_record.hash) {
				return Promise.reject(400);
			}

			token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

			_.extend(socket.handshake.session, {
				userId: user._id.toString(),
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
