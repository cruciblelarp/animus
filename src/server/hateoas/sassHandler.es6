/* globals console */

import app from '../express.es6';
import staticHandler from './staticHandler.es6';

export default function (dir, file) {

	// Handle sass to css conversion.
	app({
		method: 'GET',
		accept: 'text/css',
		uri: dir
	}, function() {
		console.log('Don\'t know how to do this yet.');
	});

	// Handle Sass to less conversion.
	app({
		method: 'GET',
		accept: 'application/less',
		uri: dir
	}, function() {
		console.log('Don\'t know how to do this yet.');
	});

	// Render the raw scss content.
	staticHandler(dir, file);

}
