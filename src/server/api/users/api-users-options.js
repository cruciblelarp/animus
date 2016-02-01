/* globals module, require */

import resource from './api-users-resource.js';

import { name as _createUser } from './api-users-create.js';
import { name as _listUsers } from './api-users-list.js';

export const name = 'options';

const method = resource.OPTIONS();

method.handler = (request, response, params) => {

	response.status = 200;
	response.json({

		GET: _listUsers,

		POST: _createUser

	});

};
