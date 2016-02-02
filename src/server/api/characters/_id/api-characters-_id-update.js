/* globals module, require */

import _ from 'underscore';
import suit from 'suit';

import resource from './api-characters-_id-resource.js';

import '../../../../prototypes.es6'

const cypher = '' +
	'MATCH (node:Character),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

export const name = 'update';

const method = resource.PUT().as('json');

method.validator = (data) => {
	return suit.fit(data, (c) => {
		return {

			id: [
				c.number,
				c.required
			],

			name: [
				c.string
			]

		};
	});
};

method.handler = (request, response) => {

	var properties = new Map(params.filter(function(key) {
		return key in [ 'name' ];
	}));

	return query(cypher, {
		userId: request.session.user.id,
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
