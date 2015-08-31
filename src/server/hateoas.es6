/* globals require, module, __dirname */

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var suit = require('suit');
var Promise = require('promise');

var app = require('./express');

var constraint = suit.constraints();

function forFilesIn(path, callback) {
	fs.readdir(path, function(error, files) {

		if (error) {
			throw error;
		}

		_.each(files, function(file) {
			callback(file, fs.stat(file));
		});

	});
}

function validate(data, schema) {
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

function wireResource(resource) {
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

function scan(dir) {

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
			var resource = require(file);
			wireResource(resource);
		}

	});

}

scan(path.resolve(__dirname, 'api'));
