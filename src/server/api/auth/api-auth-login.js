/* globals console */
'use strict';

import _ from 'underscore';
import crypto from 'crypto';

import resource from './api-auth-resource.js';
import query from '../../neo4j.js'

import '../../prototypes.js'

const operation = resource.PUT().as('json');

const cipher_login = '' +
	'MATCH (user:User { email: {email} })' +
	'  RETURN user;';

operation.validator = (c) => {
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
};

operation.handler = (request, response, params) => {

	const email = params.body.email;
	const password = params.body.password;
	console.info(`Starting login for ${email}...`);

	return query(cipher_login, {
		email: email

	}).then(function(results) {

		//console.info(JSON.stringify(results, null, '\t'));

		const result = _.first(_.first(_.first(results)));

		if (!result || !result.user) {
			console.info(`Couldn't find user for email ${email}`);
			return response.status(404).json({});;
		}

		const user = _.extend({}, result.user, {
			id: result.user._id
		});

		// run crypto hash on supplied password.
		const hash = crypto.createHash('md5')
				.update(password)
				.digest('hex');

		if (hash !== user.password) {
			console.info(`Couldn't validate user's password`);
			return response.status(401).json({});
		}

		user.token = crypto.createHash('md5')
				.update(user.email + hash)
				.digest('hex');

		request.session.user = user;
		return response.status(200).json(user);

	});

};
