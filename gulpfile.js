'use strict';

/* globals require, module */

var gulp = require('gulp');

var config = require('./src/scripts/config');

gulp.task('build', [
	'code',
	'styles',
	'manifest'
]);

gulp.task('clean', require('./src/scripts/clean'));
gulp.task('run', [ 'build' ], require('./src/scripts/runner'));
gulp.task('code', [], require('./src/scripts/code'));
gulp.task('libs', [], require('./src/scripts/libraries'));
gulp.task('styles', [], require('./src/scripts/styles'));
gulp.task('manifest', [], require('./src/scripts/manifest'));
gulp.task('mongo_start', [], require('./src/scripts/mongo_start'));
gulp.task('mongo_stop', [], require('./src/scripts/mongo_stop'));
gulp.task('bootstrap', [ 'mongo_start' ], require('./src/scripts/bootstrap'));
