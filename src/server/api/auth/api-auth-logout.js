/* globals module, require */
'use strict';

import resource from './api-auth-resource.js';

const operation = resource.DELETE().as('json');

operation.validator = (request) => {
	return suit.fit(request, (c) => {
		return {

			session: {
				user: {
					id: [
						c.required,
						c.integer
					]
				}
			}

		};
	})
};

operation.handler = (request, response, params) => {

	request.session.destroy();
	return response.status(200);

};
