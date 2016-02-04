/* globals module, require */

import _ from 'underscore';
import suit from 'suit';

import '../../../prototypes'
import resource from './api-users-resource.js';

let cipher = '' +
	'MATCH (creator:User { _id: {userId} }),(createPermission:Permission { name: \'users-create\' })' +
	'CREATE (node:User)' +
	'  WHERE id(user) = {userId}' +
	'  AND id(node) = {nodeId}' +
	'  AND (node) - [:Requires] -> (:Permission) <- [:Possesses] - (user)' +
	'  XOR NOT (node) - [:Requires] -> (:Permission)' +
	'  SET {properties}' +
	'  RETURN id(node);';

export const name = 'create';

const method = resource.POST().as('json');

method.validator = (data) => {
	return suit.fit((c) => {
		return {

			name: [
				c.string,
				c.required
			]

		}
	});
};

method.handler = function(request, response, params) {

	const properties = new Map(params.filter(function(key) {
		return key in [ 'name' ]
	}));

	query(cipher, {
		userId: session.user.id,
		properties: properties

	}).then(function(results) {

		if (!results || !results[0]) {
			response.status(500);
			response.json({
				message: 'Couldn\'t insert record for some reason.'
			});
		}

		const userId = results._id;

		response.status(200);
		response.json({
			link: `${resource.path}/${userId}`
		});

	}).catch((error) => {

		response.status(500);
		response.json({
			message: error.message
		});

	});

};

