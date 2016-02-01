/* globals module, require */

import '../../../prototypes.es6'

let _ = require('underscore');

let cipher_list = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN id(node);';

let whitelist = [
	'name'
];

module.exports = {

	method: 'GET',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

		};

	},

	resolver: function(params, session, resolve, reject) {

		query(cipher_list, {
			userId: session.user.id

		}).then(function(results) {

			return Promise.resolve();

		}).then(resolve, reject);

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
