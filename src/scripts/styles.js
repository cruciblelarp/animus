'use strict';

/* globals require, module */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = require('./config');

module.exports = function() {
	return gulp.src(config.PATH_STATIC + '/**.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('styles.min.css'))
		.pipe(minify())
		.pipe(sourcemaps.write('.', config.sourcemaps))
		.pipe(gulp.dest(config.PATH_STATIC));
};
