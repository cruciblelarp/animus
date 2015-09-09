/* globals module, require */

import '../../prototypes.es6'
import query from '../../neo4j.es6'

let _ = require('underscore');
var crypto = require('crypto');

let cipher_login = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

let whitelist = [
	'name'
];

module.exports = {

	method: 'PUT',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

			email: [
				c.email,
				c.required
			],

			password: [
				c.string,
				c.required
			]

		};
	},

	resolver: function(params, session, resolve, reject) {

		return query(cipher_login, {
			email: params.email
		}).then(function(results) {

			let result = _.first(results);

			if (!result) {
				return reject(404);
			}

			let user = _.extend({}, result.user.properties, {
				id: result.user._id
			});

			// run crypto hash on supplied password.
			let hash = crypto.createHash('md5')
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

	},

	schema: {

		request: {
			//jsonschema
		},

		response: {
			//jsonschema
		}

	}

};

