'use strict';

/* globals require, module */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var config = require('./config');

module.exports = function() {

	return nodemon({
		script: 'src/server/server.js',
		ext: 'js',
		ignore: [
			config.PATH_STATIC,
			config.PATH_SCRIPTS
		]
	});

};
