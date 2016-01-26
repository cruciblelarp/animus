/* globals module, require */
'use strict';

import resource from './api-auth-resource.js';

const operation = resource.DELETE().as('json');

operation.handler = (request, response, params) => {

	if (!request.session.user) {
		response.status = 404;
	}

	request.session.destroy();
	response.status = 200;

};
