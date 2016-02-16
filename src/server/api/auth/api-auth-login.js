/* globals module, require */
'use strict';

import _ from 'underscore';
import crypto from 'crypto';
import suit from 'suit';

import resource from './api-auth-resource.js';

import '../../prototypes.js'
import query from '../../neo4j.js'

const operation = resource.PUT().as('json');

let cipher_login = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

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

	return query(cipher_login, {
		email: params.email

	}).then(function(results) {

		let result = _.first(results);

		if (!result) {
			return response.status(404);
		}

		let user = _.extend({}, result.user.properties, {
			id: result.user._id
		});

		// run crypto hash on supplied password.
		let hash = crypto.createHash('md5')
				.update(params.password)
				.digest('hex');

		if (hash !== user.password) {
			return response.status(401);
		}

		user.token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

		request.session.user = user;
		return response.status(200).json(user);

	});

};
