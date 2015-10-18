/* globals module, require */

import '../prototypes.es6'
import manifest from '../hateoas/manifest.es6';

let _ = require('underscore');

var cache;

module.exports = {

	method: 'GET',

	contentTypes: [
		'text/cache-manifest'
	],

	resolver: function(params, session, resolve, reject) {

		let files = [];
		let network = [];

		manifest.forEach(function (entry) {

			if (entry.hash) {
				files.push(entry.path + '.' + entry.extension + ' // ' + entry.hash);
				return;
			}

			network.push(entry.path);

		});

		cache = 'CACHE MANIFEST\n';

		cache += '\nCACHE:\n';

		cache.forEach(function(item) {
			cache += item + '\n';
		});

		cache += '\nNETWORK:\n';

		_.uniq(network).forEach(function(item) {
			cache += item + '\n';
		});

		cache += '\nFALLBACK:\n';

		// put _something_ in here.

		resolve(manifest);

	}

};
