/* globals require, module */

var _ = require('underscore');
var gulp = require('gulp');

var config = require('./config');

module.exports = function() {

	return gulp.src(config.libraries)
		.pipe(gulp.dest(config.PATH_STATIC_LIBS));

};
