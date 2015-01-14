var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var manifest = require('gulp-cache-manifest');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var requirejs = require('gulp-requirejs');

var mode_prod = false;

CONFIG_CLIENT_GLOBS = [
	'src/client/**.js',
	'src/client/**.css',
	'src/client/**.html'
];

gulp.task('run', [ 'build' ], function() {

	var WATCH_CONFIG = { read: false };

	var lw = gulp.watch('node_modules', WATCH_CONFIG, [ 'build-libs' ]);
	var sw = gulp.watch('src/client/**.scss', WATCH_CONFIG, [ 'build-styles' ]);
	var rw = gulp.watch(CONFIG_CLIENT_GLOBS, WATCH_CONFIG, [ 'build-manifest' ]);

	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client'
		]
	}).on('end', function() {
		lw.emit('end');
		sw.emit('end');
		rw.emit('end');
	});

});

gulp.task('build', [
	'build-libs',
	'build-styles',
	'build-manifest'
]);

gulp.task('build-libs', function() {

	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/requirejs/require.js',
		'node_modules/requirejs-text/text.js',
		'node_modules/underscore/underscore.js'
	]).pipe(gulp.dest('src/client/lib'));

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: !mode_prod }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest('src/client/lib'));

});

gulp.task('build-clean', function() {
	gulp.src([
		'src/client/dist',
		'src/client/lib'
	]).pipe(clean({ force: true }));
});

gulp.task('build-styles', function() {
	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/client/dist'));
});

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		'src/client/app.manifest'
	]
};

gulp.task('build-manifest', function() {
	gulp.src('src/client/**')
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest('src/client'));
});
