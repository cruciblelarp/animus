/* globals require, console */

let fs = require('fs');
let paths = require('path');

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

export function scan(dir) {

	forFilesIn(dir, function(file, info) {

		if (info.isDir()) {
			return scan(file);
		}

		let extension = file.slice(file.lastIndexOf('.') + 1);

		handlers.forEach(function(handler, extensions) {
			if (extensions.contains(extension)) {
				handler(dir, file);
			}
		});

	});

}
