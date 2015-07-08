/* globals require, process, __dirname */

var fs = require('fs');
var _ = require('underscore');
var Promise = require('promise');
var paths = require('path');

var config = require('./config');
var http = require('./http');

var statFile = Promise.denodeify(fs.stat);
var listFiles = Promise.denodeify(fs.readdir);

function scandir(directory) {
	return listFiles(directory).then(function(files) {

		var promises = _.collect(files, function(file) {
			var path = paths.join(directory, file);
			return statFile(path).then(function(stats) {

				if (stats.isDirectory()) {
					return scandir(path);
				}

				if (stats.isFile() && path.match(new RegExp('.js$'))) {
					return Promise.resolve(require(path));
				}

				// Ignore
				return Promise.resolve();

			});
		});

		return Promise.all(_.compact(promises));

	});
}

scandir(__dirname + '/api').done(function() {
	http.listen(config.port, function() {
		console.log('Starting application on port ' + config.port);
	}).on('error', function(error) {
		console.error(error.stack);
	});
});
