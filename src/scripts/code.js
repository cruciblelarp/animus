'use strict';

/* globals require, module */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var optimise = require('amd-optimize');
var concat = require('gulp-concat');

var config = require('./config');

module.exports = function() {
	return gulp.src('src/client/**.js')
		.pipe(sourcemaps.init())
		.pipe(optimise('angular-bootstrap', config.requirejs))
		.on('data', function(file) {
			var path = file.history[0].substring(file.cwd.length + 1);
			console.log('Compiled ' + path);
		})
		.pipe(concat('scripts.min.js'))
		.on('data', function(file) {
			var path = file.path.substring(file.cwd.length + 1);
			console.log('Beginning minification of ' + path);
		})
		.pipe(uglify())
		.pipe(sourcemaps.write('.', config.sourcemaps))
		.pipe(gulp.dest(config.PATH_STATIC))
		.on('data', function(file) {
			var path = file.path.substring(file.cwd.length + 1);
			console.log('Finished compilation of ' + path);
		});
};
