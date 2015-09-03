/* globals require, module, __dirname */

let _ = require('underscore');
let fs = require('fs');
let paths = require('path');
let suit = require('suit');

import * as app from './express.es6';

let constraint = suit.constraints();

export function forFilesIn(path, callback) {
	return new Promise(function(resolve, reject) {

		console.log("Scanning " + path + " for files...");
		fs.readdir(path, function(error, files) {

			if (error) {
				console.error("Failed to read directory:" + path);
				return reject(error);
			}

			var promises = _.collect(files, function(fileName) {
				let file = paths.resolve(path, fileName);

				return new Promise(function(resolve, reject) {
					fs.stat(file, function(error, stats) {
						error
							? reject(error)
							: resolve(stats);
					});

				}).then(function(stats) {
					return callback(file, stats);

				}).catch(function(error) {
					console.error("Failed to stat file: " + file);
					return Promise.reject(error);
				});

			});

			return Promise.all(promises).then(resolve, reject);

		});

	});
}

export function validate(data, schema) {
	return new Promise(function(resolve, reject) {
		try {
			return resolve(suit.fit(data, schema));

		} catch (error) {

			if (_.isString(error)) {
				console.warn(error);
				return reject(400, {
					message: error
				});
			}

			if (error.message && error.stack) {
				return reject(error);
			}

			return reject(400, error);

		}
	});
}

export function wireResource(resource) {
	app[resource.method](dir, function(request, response) {

		var data = _.extend({}, request.query, request.body, request.params);

		return validate(data, resource.validator).then(function(data) {
			return resource.resolver(data, request.session);

		}).then(function (result) {
			return response.status(200).send(result);

		}).catch(function (error) {

			// Basic error response.
			if (_.isNumber(error)) {
				return response.status(error);
			}

			// Custom error response.
			if (error.status && error.message) {
				return response.status(error.status).send({
					error: error.message
				});
			}

			// System error response.
			if (error.message && error.stack) {
				console.error(error.stack);
				return response.status(500).send({
					error: error.message
				});
			}

			// Unexpected error response.
			console.error('Unexpected error response!');
			return response.status(500);

		});

	});
}

export function scan(dir) {

	forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file);
		}

		if (file.indexOf('.jade')) {
			app.get(dir, function(request, response) {
				// render jade template.
			});
		}

		if (file.indexOf('.js')) {
			app.get(dir, function(request, response) {
				response.status(200).send(require(file));
			});
		}

		if (file.indexOf('.es6')) {
			let resource = require(file);
			wireResource(resource);
		}

	});

}

scan(paths.resolve(__dirname, 'api'));
