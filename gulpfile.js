'use strict';

/* globals require, module */

var gulp = require('gulp');
var protractor = require('gulp-protractor');

gulp.task('clean', require('./src/scripts/clean'));
gulp.task('run', [], require('./src/scripts/runner'));
gulp.task('code', [ 'libs' ], require('./src/scripts/code'));
gulp.task('lib-copy', [], require('./src/scripts/lib-copy'));
gulp.task('libs', [ 'lib-copy' ]);
gulp.task('styles', [], require('./src/scripts/styles'));
gulp.task('manifest', [ 'code', 'styles' ], require('./src/scripts/manifest'));
gulp.task('selenium-update', protractor['webdriver_update']);
gulp.task('test', [ 'test-unit', 'test-e2e' ]);
gulp.task('test-unit', require('./src/scripts/test-unit'));
gulp.task('test-e2e', [ 'selenium-update' ], require('./src/scripts/test-e2e'));
gulp.task('docs', require('./src/scripts/docs'));
