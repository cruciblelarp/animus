/* globals module, require */

var _ = require('underscore');

var cipher_list = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN id(node);';

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

			var items = _.collect(results, function(result) {
				return result['id(node)'];
			});

			return Promise.resolve(items);

		}).then(resolve, reject);

	}

};
