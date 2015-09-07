/* globals module, require */

import '../../../../prototypes.es6'

let _ = require('underscore');

let cipher = '' +
	'CREATE (node:User),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

let whitelist = [
	'name'
];

module.exports = {

	method: 'POST',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

			name: [
				c.string,
				c.required
			]

		};
	},

	resolver: function(params, session, resolve, reject) {

		var properties = new Map(params.filter(function(key) {
			return key in whitelist
		}));

		query(cipher, {
			userId: session.user.id,
			properties: properties

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

