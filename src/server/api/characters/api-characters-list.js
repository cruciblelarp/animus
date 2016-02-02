/* globals module, require */

import _ from 'underscore';
import suit from 'suit';

import resource from './api-characters-resource.js';

import '../../../prototypes.es6';

const cypher = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN id(node);';

export const name = 'list';

const method = resource.GET().as('json');

method.validator = (params) => {
	return suit.fit(params, (c) => {
		return {
		};
	})
};

method.resolver = function(request, response) {

	query(cypher, {
		userId: session.user.id

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
	})

};
