/* globals module, require */
'use strict';

import _ from 'underscore';
import crypto from 'crypto';

import resource from './api-auth-resource.js';

import '../../prototypes.js'
import query from '../../neo4j.js'

const operation = resource.POST().as('json');

let cipher = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

let whitelist = [
	'name'
];

operation.validator = (data) => {
	return suit.fit(data, (c) => {
		return {

			body: {
				email: [
					c.email,
					c.required
				],

				password: [
					c.string,
					c.required
				]
			}

		};
	});
};

operation.handler = (request, response, params) => {

	// TODO: Query the database for conflicts

	// TODO: Create the User with validation = new guid.

	// TODO: Send email to validate address with callback to /auth/validate

	response.status = 201;

};

