'use strict';

/* globals require, module */

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = require('./config');

module.exports = function() {
	return gulp.src('src/client/**.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('styles.min.css'))
		.pipe(minify())
		.pipe(sourcemaps.write('.', config.sourcemaps))
		.pipe(gulp.dest(config.PATH_STATIC));
};
