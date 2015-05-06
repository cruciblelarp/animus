'use strict';

/* globals require, module */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var config = require('./config');

module.exports = function() {

	return gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: false }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest(config.PATH_STATIC_LIBS))
		.on('data', function(file) {
			var path = file.history[file.history.length - 1].substring(file.cwd.length + 1);
			console.log('Completed compilation of html5client -> ' + path);
		});

};
