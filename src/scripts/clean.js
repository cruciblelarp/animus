'use strict';

/* globals require, module */

var gulp = require('gulp');
var clean = require('gulp-clean');

var config = require('./config');

module.exports = function() {
	gulp.src([
		config.PATH_STATIC,
		'src/client/lib'
	]).pipe(clean({
		force: true
	}));
};
