'use strict';

/* globals require, module */

var gulp = require('gulp');
var optimise = require('amd-optimize');
var jade = require('gulp-jade');
var reduce = require('stream-reduce');
var path = require('path');

var config = require('./config');
var config_requirejs = require('./requirejs');

function amd_reduction(memo, item) {
	memo.push('./' + path.relative(config.PATH_STATIC_ABS, item.path));
	return memo;
}

module.exports = function() {

	gulp.src('src/client/**.js')
		.pipe(optimise('angular-bootstrap', config_requirejs))
		.pipe(gulp.dest(config.PATH_STATIC))
		.pipe(reduce(amd_reduction, []))
		.on('data', function(list) {

			var config_jade = {
				pretty: '\t',
				data: {
					scripts: list
				}
			};

			gulp.src('src/client/client.jade')
				.pipe(jade(config_jade))
				.pipe(gulp.dest(config.PATH_STATIC));

		});


};
