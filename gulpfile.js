var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var manifest = require('gulp-cache-manifest');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var requirejs = require('gulp-requirejs');

var mode_prod = false;

var CONFIG_CLIENT_GLOBS = [
	'src/client/**.js',
	'src/client/**.css',
	'src/client/**.html'
];

var WATCH_CFG_NOREAD = {
	read: false
};

gulp.task('run', function() {

	var lw = gulp.watch('node_modules', WATCH_CFG_NOREAD, [ 'libs' ]);
	lw.on('change', function() {
		console.log('Changes in library code. Recompiling.');
	});

	var sw = gulp.watch('src/client/**.scss', WATCH_CFG_NOREAD, [ 'styles' ]);
	sw.on('change', function() {
		console.log('Changes in style code. Recompiling.');
	});

	var rw = gulp.watch(CONFIG_CLIENT_GLOBS, WATCH_CFG_NOREAD, [ 'manifest' ]);
	rw.on('change', function() {
		console.log('Changes in client code. Recompiling.');
	});

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
	'libs',
	'styles',
	'manifest'
]);

gulp.task('libs', function() {

	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/requirejs/require.js',
		'node_modules/requirejs-text/text.js',
		'node_modules/underscore/underscore.js'
	]).pipe(gulp.dest('src/client/lib'));

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: false }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest('src/client/lib'));

});

gulp.task('clean', function() {
	gulp.src([
		'src/client/lib',
		'src/client/app.manifest',
		'src/client/styles.css'
	]).pipe(clean({
		force: true
	}));
});

gulp.task('styles', function() {
	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/client'));
});

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		'src/client/app.manifest'
	]
};

gulp.task('manifest', function() {
	gulp.src(mode_prod ? CONFIG_CLIENT_GLOBS : [])
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest('src/client'));
});
