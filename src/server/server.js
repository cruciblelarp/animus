/* globals require, process, __dirname */

var _ = require('underscore');
var Promise = require('promise');

var config = require('./config');
var http = require('./http');
var rest = require('./rest');

var running = false;

rest.then(function() {
	console.log('API endpoints successfully wired.');
}, function(error) {
	console.error('API endpoints failed to wire: ' + error.message);
	console.error(error.stack);
});

module.exports = {

	start: function() {

		if (running) {
			return Promise.reject(new Error('Server already running.'));
		}

		var promise_resolve, promise_reject;
		var promise = new Promise(function(resolve, reject) {
			promise_resolve = resolve;
			promise_reject = reject;
		});

		running = true;
		http.listen(config.port, config.hostname, function() {
			console.log('Starting application on http://' + config.hostname + ':' + config.port + '/');
			promise_resolve();

		}).on('error', function(error) {

			console.error(error.stack);

			running = false;
			promise_reject(error);

		});

		return promise;

	},

	stop: function() {

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
				promise_reject(error);
			}

			running = false;
			promise_resolve();

		});

		return promise;

	}

};
