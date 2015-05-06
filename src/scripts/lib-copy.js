'use strict';

/* globals require, module */

var gulp = require('gulp');

var config = require('./config');

module.exports = function() {

	return gulp.src(config.libraries)
		.pipe(gulp.dest(config.PATH_STATIC_LIBS))
		.on('data', function(file) {
			var paths = file.history;
			var from = paths[paths.length - 2].substring(file.cwd.length + 1);
			var to = paths[paths.length - 1].substring(file.cwd.length + 1);
			console.log("Copyied " + from + " to " + to);
		});

};
