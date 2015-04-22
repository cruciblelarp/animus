'use strict';

/* globals require, module */

var gulp = require('gulp');
var clean = require('gulp-clean');

var config = require('./config');

module.exports = function() {
	gulp.src([
		config.PATH_STATIC_LIBS
	]).pipe(clean({
		force: true
	}));
};
