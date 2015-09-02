/* globals require, process, __dirname */

var _ = require('underscore');

var config = require('./config');
var http = require('./http');
var rest = require('./rest');

var running = false;

module.exports = {

	start: function(onSuccess, onError) {

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
			console.log('Starting application on http://' + config.hostname + ':' + config.port + '/');
			onSuccess && onSuccess();
			return promise_resolve();

		}).on('error', function(error) {

			console.error(error.stack);

			running = false;
			onError && onError();
			return promise_reject(error);

		});

		return promise;

	},

	stop: function(onSuccess, onError) {

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

};
