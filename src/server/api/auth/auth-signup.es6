/* globals module, require */

import '../../prototypes.es6'
import * as query from '../../neo4j.es6'

let _ = require('underscore');
var crypto = require('crypto');

let cipher = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

let whitelist = [
	'name'
];

module.exports = {

	method: 'POST',

	contentTypes: [
		'application/json',
		'text/json'
	],

	validator: function(c) {
		return {

			email: [
				c.email,
				c.required
			],

			password: [
				c.string,
				c.required
			]

		};
	},

	resolver: function(params, session, resolve, reject) {

		// TODO: Query the database for conflicts

		// TODO: Create the User with validation = new guid.

		// TODO: Send email to validate address with callback to /auth/validate

		// TODO: Return success response.

	},

	schema: {

		request: {
			//jsonschema
		},

		response: {
			//jsonschema
		}

	}

};

