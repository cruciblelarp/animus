/* globals require, module, console */

var _ = require('underscore');
var crypto = require('crypto');
var Promise = require('promise');

var query = require('../../neo4j');
var validator = require('../../validator');

var validate = validator(function(c) {
	return {
		email: c.email,
		password: c.string
	}
});

module.exports = function(email, password) {
	return new Promise(function(resolve, reject) {

		validate({
			email: email,
			password: password
		}, function (message) {
			return reject(400, message);
		});

		return query('MATCH (user:User { email: {email} }) RETURN user;', {
			email: email
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
				.update(password)
				.digest('hex');

			if (hash !== user.password) {
				return reject(401);
			}

			user.token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

			return resolve(user);

		});

	});
};
