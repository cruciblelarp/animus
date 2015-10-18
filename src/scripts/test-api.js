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

module.exports = function(done) {
	gulp.src('src/test/api/**/*.spec.*')
		.pipe(mocha(mocha_config))
		.on('error', utils.log)
		.once('end', done);
};
