'use strict';

/* globals require, module */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var config = require('./config');

module.exports = function() {

	return nodemon({
		script: 'index.js',
		ext: 'js',
		ignore: [
			'src/server/static',
			'src/scripts',
			'src/client'
		]
	});

};
