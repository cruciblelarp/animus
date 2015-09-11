/* globals require */

import app from '../express.es6';

let crypto = require('crypto');

export default function (dir, file) {

	let item = require(file);

	let entry = manifest[file] = {
		extension: file.slice(file.lastIndexOf('.')),
		hash: crypto.createHash('sha256')
			.update(item.content)
			.digest('hex')
	};

	app({
		method: 'GET',
		uri: dir,
		accept: mime[file.slice(file.lastIndexOf('.'))]
	}, function(request, response) {

		response.status(200)
			.body(item.content)
			.header('Content-Type', mime[entry.extension])
			.header('etag', mime[entry.extension]);

	});

}
