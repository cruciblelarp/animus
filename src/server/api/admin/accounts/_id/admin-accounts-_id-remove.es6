/* globals module, require */

var _ = require('underscore');

var cipher_list = '' +
	'MATCH (node:User)-[relationship]-(),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  DELETE node, relationship;';

module.exports = {

	method: 'DELETE',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

			id: [
				c.number,
				c.required
			]

		};
	},

	resolver: function(params, session, resolve, reject) {

		query(cipher_list, {
			nodeId: params.id,
			userId: session.user.id

		}).then(function() {

			return Promise.resolve();

		}).then(resolve, reject);

	}

};

