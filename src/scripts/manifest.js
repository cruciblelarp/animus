'use strict';

/* globals require, module */

var gulp = require('gulp');
var manifest = require('gulp-cache-manifest');

var config = require('./config');

module.exports = function() {
	gulp.src(config.PATH_STATIC + '/**')
		.pipe(manifest(config.manifest))
		.pipe(gulp.dest(config.PATH_STATIC));
};
