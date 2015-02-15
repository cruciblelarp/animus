'use strict';

/* globals require, module */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

module.exports = function() {

	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/requirejs/require.js',
		'node_modules/requirejs-text/text.js',
		'node_modules/underscore/underscore.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.js',
		'node_modules/angulartics/src/angulartics.js',
		'node_modules/angulartics/src/angulartics-ga.js'
	]).pipe(gulp.dest('src/client/lib'));

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: false }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest('src/client/lib'));

};
