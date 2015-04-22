'use strict';

/* globals require, module */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var config = require('./config');

module.exports = function() {

	gulp.src([
		'node_modules/URIjs/src/URI.js',
		'node_modules/URIjs/src/punycode.js',
		'node_modules/URIjs/src/IPv6.js',
		'node_modules/URIjs/src/SecondLevelDomains.js',
		'node_modules/angular/angular.js',
		'node_modules/requirejs/require.js',
		'node_modules/requirejs-text/text.js',
		'node_modules/underscore/underscore.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.js',
		'node_modules/angulartics/src/angulartics.js',
		'node_modules/angulartics/src/angulartics-ga.js'
	]).pipe(gulp.dest(config.PATH_STATIC_LIBS));

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: false }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest(config.PATH_STATIC_LIBS));

};
