/* globals */

import manifest from './manifest.es6';

export function resolveMime(request) {
	let accept = request.header('Accept');
}

export function resolvePath(request) {
	let path = request.path;
}

export default function(config) {

	manifest.init(config.base);

	return function(request, response) {

		let path = resolvePath(request);
		let method = request.method;
		let mime = resolveMime(request);

		let handler = manifest.find(path, method, mime);

		return handler(request, response);

	}

}
