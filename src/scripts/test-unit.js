/* globals require, module */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var utils = require('gulp-util');

var config = require('./config');

var mocha_config = {
};

module.exports = function() {
	return gulp.src('src/test/**/*.spec.js')
		.pipe(mocha(mocha_config))
		.on('error', utils.log);
};
