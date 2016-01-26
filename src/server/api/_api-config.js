/* global */
'use strict';

import module from './_api-module.js';

// import sub-paths
import controller from './_api-controller.js';
import template from './_api-template.jade';

export const name = 'api';
export const path = '/';
export const children = [
//	[_account.name]: _account,
//	[_admin.name]: _admin
//	[_auth.name]: _auth
//	[_characters.name]: _characters
];

module.config([
	() => {
		//
	}
]);
