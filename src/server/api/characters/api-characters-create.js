/* globals module, require */

import '../../../prototypes.es6'

let _ = require('underscore');

let cipher = '' +
	'CREATE (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

const method = resource.POST().as('json');

method.validator = (data) => {
	return suit.fit(data, (c) => {
		return {
		};
	});
};

method.resolver = (request, response) => {

	var properties = new Map(params.filter(function(key) {
		return key in [ 'name' ];
	}));

	query(cipher, {
		userId: session.user.id,
		properties: properties

	}).then(function(results) {

		if (!results) {
			response.status = 404;
			return;
		}

		response.status = 200;
		response.json({
			results: results
		});

	}).catch((error) => {
		response.status = 500;
		response.json({
			message: error.message
		});

	});

};
