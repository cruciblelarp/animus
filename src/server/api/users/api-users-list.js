/* globals module, require */

import _ from 'underscore';

import resource from './api-users-resource.js';
import query from '../../neo4j.js';

import '../../prototypes.js'

const operation = resource.GET().as('json');

const cipher_list = '' +
	'MATCH (node:User),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  RETURN id(node);';

export const name = 'list';

operation.validator = (c) => {
	return {
	}
};

operation.handler = (request, response, params) => {

	const userId = request.session.user && request.session.user.id;

	if (!userId) {
		return response.status(401).json({});
	}

	return query(cipher_list, {
		userId: userId

	}).then(function(results) {

		console.info(JSON.stringify(results, null, '\t'));

		return Promise.resolve();

	});

};
