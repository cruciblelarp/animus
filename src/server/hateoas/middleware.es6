/* globals */

import manifest from './manifest.es6';

export default function(config) {

	manifest.init(config.base);

	return function(request, response) {

		let path = request.path;
		let method = request.method;
		let mime = request.headers['Accept'] || '*/*';

		console.log(`REQUEST: ${method}[${mime}]:${path}`);
		let handler = manifest.find(path, method, mime);

		if (!handler) {
			response.status(404);
			return;
		}

		console.log(`HANDLER: ${JSON.stringify(handler)}`);
		return handler(request, response);

	}

}
