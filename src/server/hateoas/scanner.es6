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

/**
 *
 * @param {String} path
 * @param {Function} onFileRead
 * @returns {Promise}
 */
export function forFilesIn(path, onFileRead) {
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
					return onFileRead(file, stats);

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
 * @returns {Promise}
 */
export function scan(dir, onConfigFound) {
	return forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file, onConfigFound);
		}

		let extension = file.slice(file.lastIndexOf('.') + 1);
		if (extension === 'es6') {
			return onConfigFound(_.extend(require(file), {
				extension: extension
			}));
		}

		return onConfigFound({
			extension: extension,
			contentFile: file
		});

	});
}
