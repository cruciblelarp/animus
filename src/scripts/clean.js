'use strict';

/* globals require, module */

var gulp = require('gulp');
var clean = require('gulp-clean');

var config = require('./config');

module.exports = function() {
	return gulp.src([
		config.PATH_STATIC_LIBS,
		config.PATH_STATIC + '/**/*.min.*'
	]).pipe(clean({
		force: true
	}));
};
