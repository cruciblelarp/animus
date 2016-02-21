'use strict';

/* globals require, module */

var gulp = require('gulp');
var clean = require('gulp-clean');

var config = require('./config');

module.exports = function() {
	return gulp

			.src('target')

			.pipe(clean({
				force: true
			}));

};
