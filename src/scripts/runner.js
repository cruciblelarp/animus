'use strict';

/* globals require, module */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./config');

var WATCH_CFG_NOREAD = {
	read: false
};

module.exports = function() {

	//var sw = gulp.watch('src/client/**/*.scss', WATCH_CFG_NOREAD, [ 'styles' ]);
	//var cw = gulp.watch('src/client/**/*.js', WATCH_CFG_NOREAD, [ 'code' ]);

	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client',
			'src/server/static'
		]
	}).on('end', function() {
		//sw.emit('end');
		//cw.emit('end');
	});

};
