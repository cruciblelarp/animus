/* globals require, module, console */

var _ = require('underscore');
var assert = require('assert');
var crypto = require('crypto');
var Promise = require('promise');

var query = require('../neo4j');
var socket = require('../socket');

socket.$listen('login', function(socket, model, data) {
	var session = socket.handshake.session;
	console.log(session.id + ': Attempting authentication');

	var email = data.email;
	var password = data.password;

	// validate request
	try {
		assert(password != null);
		assert(email != null);
	} catch (error) {
		return Promise.reject(400);
	}

	return query('MATCH (user:User { email: {email} }) RETURN user;', {
		email: email
	}).then(function(results) {

		var result = _.first(results);

		if (!result) {
			return Promise.reject(404);
		}

		var user = _.extend({}, result.user.properties, {
			id: result.user._id
		});

		// run crypto hash on supplied password.
		var hash = crypto.createHash('md5')
			.update(password)
			.digest('hex');

		if (hash !== user.password) {
			return Promise.reject(400);
		}

		user.token = crypto.createHash('md5')
			.update(user.email + hash)
			.digest('hex');

		delete user.password;
		model.user = user;

		console.log(session.id + ': Authentication successful');
		socket.emit('login', {
			status: 200
		});

	}).catch(function(error) {

		if (error && _.isNumber(error)) {
			return socket.emit('login', {
				status: error,
				message: 'Authentication failed.'
			});
		}

		console.error(session.id + ': ' + error.stack);
		return socket.emit('login', {
			status: 500,
			message: error.message
		});

	}).done(function() {
		console.log(session.id + ': Login request complete.');
	}, function(error) {
		console.error(session.id + ': ' + error.stack);
		socket.emit('auth', {
			status: 500,
			message: error.message
		});
	});

});

socket.$react(function(model, socket) {

	model.on('user', function(user) {
		socket.emit('sync', {
			updates: [{
				type: 'replace',
				key: 'user',
				value: user
			}]
		});
	});

});

