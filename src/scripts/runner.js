'use strict';

/* globals require, module */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var config = require('./config');

module.exports = function() {

	var sw = gulp.watch([
		config.PATH_STATIC + '/**/*.scss'
	], config.watch_noread, [ 'styles' ]);

	var cw = gulp.watch([
		config.PATH_STATIC + '/**/*.js',
		'!' + config.PATH_STATIC + '/**/*.min.js'
	], config.watch_noread, [ 'code' ]);

	var mw = gulp.watch([
		config.PATH_STATIC + '/**',
		'!' + config.PATH_STATIC + '/**/*.manifest'
	], config.watch_noread, [ 'manifest' ]);

	nodemon({
		script: 'src/server/server.js',
		ext: 'js',
		ignore: [
			config.PATH_STATIC,
			config.PATH_SCRIPTS
		]
	}).on('end', function() {
		sw.emit('end');
		cw.emit('end');
		mw.emit('end');
	});

};
