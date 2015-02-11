'use strict';

/* globals require, module */

var gulp = require('gulp');
var through = require('through');
//var mongo = require('mongo');

module.exports = function() {
	gulp.src('src/scripts/bootstrap/*.json')
		.pipe(through(function(file) {
			var data = require(file.history[0]);
			console.log('.');
		}));
};
