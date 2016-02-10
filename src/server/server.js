/* globals require, process, __dirname */

var _ = require('underscore');

import config from './config';
import http from './http';
import rest from './hateoas';
import './api/index.js';

var running = false;

export function start(onSuccess, onError) {

	if (running) {
		var error = new Error('Server already running.');
		onError && onError(error);
		return Promise.reject(error);
	}

	var promise_resolve, promise_reject;
	var promise = new Promise(function(resolve, reject) {
		promise_resolve = resolve;
		promise_reject = reject;
	});

	running = true;
	http.listen(config.port, config.hostname, function() {
		console.log('Started application on http://' + config.hostname + ':' + config.port + '/');
		onSuccess && onSuccess();
		return promise_resolve();

	}).on('error', function(error) {

		console.error(error.stack);

		running = false;
		onError && onError();
		return promise_reject(error);

	});

	return promise;

}

export function stop(onSuccess, onError) {

	if (!running) {
		return Promise.reject(new Error('Server already stopped.'));
	}

	var promise_resolve;
	var promise_reject;
	var promise = new Promise(function(resolve, reject) {
		promise_resolve = resolve;
		promise_reject = reject;
	});

	http.close(function(error) {
		console.log('Application shutdown complete.');

		if (error) {
			console.error(error.stack);
			onError && onError();
			return promise_reject(error);
		}

		running = false;
		onSuccess && onSuccess();
		return promise_resolve();

	});

	return promise;

}
