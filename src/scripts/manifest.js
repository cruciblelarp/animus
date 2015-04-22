'use strict';

/* globals require, module */

var gulp = require('gulp');
var manifest = require('gulp-cache-manifest');

var config = require('./config');

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		config.PATH_STATIC + '/app.manifest'
	]
};

module.exports = function() {
	gulp.src(config.PATH_STATIC + '/**')
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest(config.PATH_STATIC));
};
