/* globals module, require */

import * as _ from 'underscore';

import '../prototypes.es6'
import resource from './api-resource.js';
import hateoas from '../hateoas.js';

resource.GET().as('cache-manifest').handler = (request, response) => {

	let cache = '';

	cache = 'CACHE MANIFEST\n';

	cache += '\nCACHE:\n';

	//cache.forEach(function(item) {
	//	cache += item + '\n';
	//});

	cache += '\nNETWORK:\n';

	_.each(hateoas.resources, (resource) => {
		cache += resource.path + '\n';
	});

	cache += '\nFALLBACK:\n';

	// put _something_ in here.

	resolve(manifest);

};
