/* global */
'use strict';

import resource from './api-auth-resource.js';

const operation = resource.GET().as('json');

operation.handler = (request, response) => {

	if (!session.user) {
		response.status(401);
		return;
	}

	response.status(200)
			.body(JSON.stringify(session.user)); // super-insecure.

};
