/* globals module, require */

import '../../../prototypes.js'

import _ from 'underscore';

import resource from './api-users-_id-resource.js';

const cipher_list = '' +
	'MATCH (node:User),(user:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

const operation = resource.PUT().as('json');

let whitelist = [
	'name'
];

operation.validator = (data) => {
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

operation.handler = function(request, response, params) {

	var properties = new Map(params.filter(function(key) {
		return key in whitelist
	}));

	return query(cipher_list, {
		nodeId: params.id,
		userId: session.user.id,
		properties: properties

	}).then(function(results) {

		request.status = 200;

	}).catch((error) => {
		request.status = 500;
		request.json = error;
	});

};
