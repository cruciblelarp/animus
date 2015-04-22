'use strict';

/* globals require, module */

var gulp = require('gulp');
var optimise = require('amd-optimize');
var jade = require('gulp-jade');
var reduce = require('stream-reduce');
var path = require('path');
var rename = require('gulp-rename');

var config = require('./config');
var config_requirejs = require('./requirejs');

function amd_reduction(memo, item) {
	memo.push(path.relative(config.PATH_STATIC_ABS, item.path).replace('\\', '/'));
	return memo;
}

module.exports = function() {

	var config_jade = {
		pretty: '\t',
		data: {}
	};

	gulp.src(config.PATH_STATIC + '/client.jade')
		.pipe(jade(config_jade))
		.pipe(rename('debug.html'))
		.pipe(gulp.dest(config.PATH_STATIC));

	gulp.src(config.PATH_STATIC + '/**.js')
		.pipe(optimise('angular-bootstrap', config_requirejs))
		.pipe(gulp.dest(config.PATH_STATIC + '/dist')) // TODO: Make compressed files sit next to uncompressed ones.
		.pipe(reduce(amd_reduction, []))
		.on('data', function(list) {

			var config_jade = {
				pretty: '\t',
				data: {
					scripts: list
				}
			};

			gulp.src(config.PATH_STATIC + '/client.jade')
				.pipe(jade(config_jade))
				.pipe(rename('client.html'))
				.pipe(gulp.dest(config.PATH_STATIC));

		});


};
