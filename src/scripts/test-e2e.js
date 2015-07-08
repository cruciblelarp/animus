/* globals require, module */

var gulp = require('gulp');
var protractor = require('gulp-angular-protractor');
var utils = require('gulp-util');

var config = require('./config');

var protractor_config = {
	configFile: 'src/test/protractor.js',
	args: [ '--baseUrl', 'http://' + config.hostname + ':' + config.port + '/' ],
	autoStartStopServer: true,
	debug: true
};

module.exports = function() {
	return gulp.src('src/test/**/*.e2e.js')
		.pipe(protractor(protractor_config))
		.on('error', utils.log);
};
