/* globals require, process, __dirname */

var _ = require('underscore');
var Promise = require('promise');

var config = require('./config');
var http = require('./http');
var rest = require('./rest');

var running = null;

module.exports = function start() {

	if (running) {
		console.log('Server already running.');
		return running;
	}

	console.log('Beginning server start');
	running = rest.then(function() {

		console.log('API endpoints successfully wired.');
		return new Promise(function(resolve, reject) {

			http.listen(config.port, config.hostname, function() {
				console.log('Starting application on http://' + config.hostname + ':' + config.port + '/');

				return resolve(function stop() {
					return new Promise(function(resolve, reject) {

						return http.close(function(error) {
							console.log('Application shutdown complete.');

							if (error) {
								console.error(error.stack);
								return reject(error);
							}

							running = null;
							return resolve(start);

						});

					});
				});

			}).on('error', function(error) {
				console.error(error.stack);
				return reject(error);
			});

		});
	});

	return running;

};
