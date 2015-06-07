'use strict';

/* globals require, module */

var gulp = require('gulp');

gulp.task('clean', require('./src/scripts/clean'));
gulp.task('run', [], require('./src/scripts/runner'));
gulp.task('code', [ 'libs' ], require('./src/scripts/code'));
gulp.task('lib-copy', [], require('./src/scripts/lib-copy'));
gulp.task('libs', [ 'lib-copy' ]);
gulp.task('styles', [], require('./src/scripts/styles'));
gulp.task('manifest', [ 'code', 'styles' ], require('./src/scripts/manifest'));
gulp.task('test', [ 'test-unit', 'test-e2e' ]);
gulp.task('test-unit', [ 'code' ], require('./src/scripts/test-unit'));
gulp.task('test-e2e', require('./src/scripts/test-e2e'));
