/* globals module, require */

var _ = require('underscore');

var cipher_list = '' +
	'MATCH (node:User),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN node;';

module.exports = {

	method: 'GET',

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

		}).then(function(results) {

			var items = _.collect(results, function(result) {
				return result['node'];
			});

			return Promise.resolve(items);

		}).then(resolve, reject);

	}

};

