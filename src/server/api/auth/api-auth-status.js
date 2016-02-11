/* global */
'use strict';

import resource from './api-auth-resource.js';

const operation = resource.GET().as('json');

operation.handler = (request, response) => {

	const user = request.session.user;

	if (!user) {

		response.status(401).json({
			message: 'No user currently logged-in!'
		});

		return;

	}

	response.status(200).json(user); // super-insecure.

};
