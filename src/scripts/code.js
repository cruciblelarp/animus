'use strict';

/* globals require, module */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var optimise = require('amd-optimize');
var concat = require('gulp-concat');
var path = require('path');

var config = require('./config');

module.exports = function() {
	gulp.src(config.PATH_STATIC + '/**.js')
		.pipe(sourcemaps.init())
		.pipe(optimise('angular-bootstrap', config.requirejs))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.', config.sourcemaps))
		.pipe(gulp.dest(config.PATH_STATIC));
};
