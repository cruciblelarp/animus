'use strict';

/* globals require, module */

var gulp = require('gulp');
var manifest = require('gulp-cache-manifest');

var config = require('./config');

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		'src/client/app.manifest'
	]
};

module.exports = function() {
	gulp.src('src/server/static/**')
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest(config.PATH_STATIC));
};
