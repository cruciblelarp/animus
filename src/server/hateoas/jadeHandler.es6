/* globals console */

import app from '../express.es6';
import staticHandler from './staticHandler.es6';

export default function (dir, file) {

	app({
		method: 'GET',
		uri: dir,
		accept: mime.html
	}, function() {
		console.log('Don\'t know how to do this yet.');
	});

	// render the raw jade file.
	staticHandler(dir, file);

}
