/* globals require */

import app from '../express.es6';

let suit = require('suit');

export function validate(data, schema) {
	return new Promise(function(resolve, reject) {
		try {
			return resolve(suit.fit(data, schema));

		} catch (error) {

			if (_.isString(error)) {
				console.warn(error);
				return reject(400, {
					message: error
				});
			}

			if (error.message && error.stack) {
				return reject(error);
			}

			return reject(400, error);

		}
	});
}

export default function(dir, resource) {
	app[resource.method](dir, function(request, response) {

		var data = _.extend({}, request.query, request.body, request.params);

		return validate(data, resource.validator).then(function(data) {
			return resource.resolver(data, request.session);

		}).then(function (result) {
			return response.status(200).send(result);

		}).catch(function (error) {

			// Basic error response.
			if (_.isNumber(error)) {
				return response.status(error);
			}

			// Custom error response.
			if (error.status && error.message) {
				return response.status(error.status).send({
					error: error.message
				});
			}

			// System error response.
			if (error.message && error.stack) {
				console.error(error.stack);
				return response.status(500).send({
					error: error.message
				});
			}

			// Unexpected error response.
			console.error('Unexpected error response!');
			return response.status(500);

		});

	});
}
