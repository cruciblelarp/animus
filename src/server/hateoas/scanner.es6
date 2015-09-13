/* globals require, console */

import jadeHandler from './jadeHandler.es6';
import staticHandler from './staticHandler.es6';
import actionHandler from './actionHandler.es6';
import sassHandler from './sassHandler.es6';

const fs = require('fs');
const paths = require('path');

const handlers = {
	jade: jadeHandler,
	js: staticHandler,
	es6: actionHandler,
	scss: sassHandler
};

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

/**
 *
 * @param {String} dir
 * @param {Function} onConfigFound
 */
export function scan(dir, onConfigFound) {

	forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file);
		}

		let extension = file.slice(file.lastIndexOf('.') + 1);
		let handler = handlers[extension];

		if (!handler) {
			console.error('Unrecognised file extension: ' + extension);
			return;
		}

		return handler(dir, file);

	});

}
