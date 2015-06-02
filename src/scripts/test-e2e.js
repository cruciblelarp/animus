/* globals require, module */

var gulp = require('gulp');
var protractor = require('gulp-angular-protractor');
var utils = require('gulp-util');

var config = require('./config');

var protractor_config = {
	configFile: 'src/test/protractor.js',
	args: [ '--baseUrl', 'http://127.0.0.1:8000' ],
	autoStartStopServer: true,
	debug: true
};

module.exports = function() {
	return gulp.src('src/test/**/*.e2e.js')
		.pipe(protractor(protractor_config))
		.on('error', utils.log);
};
