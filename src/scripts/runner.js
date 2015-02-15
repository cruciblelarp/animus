'use strict';

/* globals require, module */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var config = require('./config');

var WATCH_CFG_NOREAD = {
	read: false
};

module.exports = function() {

	var lw = gulp.watch('node_modules', WATCH_CFG_NOREAD, [ 'libs' ]);
	var sw = gulp.watch('src/client/**.scss', WATCH_CFG_NOREAD, [ 'styles' ]);
	var cw = gulp.watch('src/client/**.js', WATCH_CFG_NOREAD, [ 'code' ]);

	var mw = gulp.watch([
		config.PATH_STATIC + '/**.js',
		config.PATH_STATIC + '/**.css',
		config.PATH_STATIC + '/**.jade'
	], WATCH_CFG_NOREAD, [ 'manifest' ]);

	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client'
		]
	}).on('end', function() {
		lw.emit('end');
		sw.emit('end');
		mw.emit('end');
		cw.emit('end');
	});

};
