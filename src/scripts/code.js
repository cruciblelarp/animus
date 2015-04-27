'use strict';

/* globals require, module */

var gulp = require('gulp');
var optimise = require('amd-optimize');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var path = require('path');

var config = require('./config');
var config_requirejs = require('./requirejs');

module.exports = function() {

	gulp.src(config.PATH_STATIC + '/**.js')
		.pipe(sourcemaps.init())
		.pipe(optimise('angular-bootstrap', config_requirejs))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.PATH_STATIC));

};
