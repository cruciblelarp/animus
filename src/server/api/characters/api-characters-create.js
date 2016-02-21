/* globals module, require */

import _ from 'underscore';

import resource from './api-characters-resource.js';

import '../../prototypes.js'

const cypher = '' +
	'CREATE (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

const method = resource.POST().as('json');

method.validator = (request) => {
	return suit.fit(request, (c) => {
		return {

			session: {
				user: {
					id: [
						c.required,
						c.integer
					]
				}
			}

		};
	})
};

method.resolver = (request, response) => {

	var properties = new Map(params.filter(function(key) {
		return key in [ 'name' ];
	}));

	return query(cypher, {
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

	});

};
