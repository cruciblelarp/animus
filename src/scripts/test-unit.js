/* globals require, module */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var utils = require('gulp-util');

var config = require('./config');

var mocha_config = {
	ui: 'bdd',
	reporter: 'spec',
	bail: false,
	grep: '^.+\\.spec\\..+$',
	compilers: {
		es6: 'mocha-traceur'
	}
};

module.exports = function() {
	return gulp.src('src/test/**/*.spec.*')
		.pipe(mocha(mocha_config))
		.on('error', utils.log)
		.once('end', function() {
			process.exit();
		})
};
