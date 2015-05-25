'use strict';

/* globals require, module */

var gulp = require('gulp');

gulp.task('clean', require('./src/scripts/clean'));
gulp.task('run', [ 'manifest' ], require('./src/scripts/runner'));
gulp.task('code', [ 'libs' ], require('./src/scripts/code'));
gulp.task('lib-copy', [], require('./src/scripts/lib-copy'));
gulp.task('lib-compile-swarm', [], require('./src/scripts/lib-compile-swarm'));
gulp.task('libs', [ 'lib-copy', 'lib-compile-swarm' ]);
gulp.task('styles', [], require('./src/scripts/styles'));
gulp.task('manifest', [ 'code', 'styles' ], require('./src/scripts/manifest'));
gulp.task('test', [ 'code' ], require('./src/scripts/test'));
