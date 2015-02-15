'use strict';

/* globals require, module */

var gulp = require('gulp');
var sass = require('gulp-sass');

var config = require('./config');

module.exports = function() {
	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest(config.PATH_STATIC));
};
