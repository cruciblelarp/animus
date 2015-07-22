/* globals require, module, console */

var _ = require('underscore');
var crypto = require('crypto');
var Promise = require('promise');

var query = require('../neo4j');
var wrapper = require('./wrapper');

var cipher_login = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

module.exports = {

	login: wrapper(function(c) {
		return {
			email: [ c.email, c.required ],
			password: [ c.string, c.required ]
		}

	}, function(params, session, resolve, reject) {

		return query(cipher_login, {
			email: params.email
		}).then(function(results) {

			var result = _.first(results);

			if (!result) {
				return reject(404);
			}

			var user = _.extend({}, result.user.properties, {
				id: result.user._id
			});

			// run crypto hash on supplied password.
			var hash = crypto.createHash('md5')
				.update(params.password)
				.digest('hex');

			if (hash !== user.password) {
				return reject(401);
			}

			user.token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

			session.user = user;
			return resolve(user);

		});

	}),

	logout: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {

		if (!session.user) {
			return reject(404);
		}

		session.destroy();
		return resolve();

	}),

	check: wrapper(function(c) {
		return {
		};

	}, function(params, session, resolve, reject) {

		if (!session.user) {
			return reject(401);
		}

		return resolve(session.user);

	})

};
