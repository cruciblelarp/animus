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

	var mw = gulp.watch('src/server/static/**', WATCH_CFG_NOREAD, [ 'manifest' ]);
	mw.on('change', function() {
		console.log('Changes in static code. Recompiling.');
	});

	var cw = gulp.watch('src/client/**.js', WATCH_CFG_NOREAD, [ 'code' ]);
	cw.on('change', function() {
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
		mw.emit('end');
		cw.emit('end');
	});

});

gulp.task('build', [
	'libs',
	'styles',
	'code',
	'manifest'
]);

var CONFIG_REQUIREJS = {

	name: 'angular-bootstrap',
	baseUrl: 'src/client',
	out: 'client.js',

	paths: {
		'angular': 'lib/angular',
		'text': 'lib/text',
		'underscore': 'lib/underscore',
		'swarm-client' : 'lib/swarm-client'
	},

	shim: {

		'angular': {
			exports: 'angular'
		},

		'underscore': {
			exports: '_'
		}

	}

};

gulp.task('code', function() {

	requirejs(CONFIG_REQUIREJS)
		.pipe(gulp.dest('src/server/static'));

	gulp.src('src/client/client.html')
		.pipe(gulp.dest('src/server/static'));

});

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
		'src/server/static',
		'src/client/lib'
	]).pipe(clean({
		force: true
	}));
});

gulp.task('styles', function() {
	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/server/static'));
});

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		'src/client/app.manifest'
	]
};

gulp.task('manifest', function() {
	gulp.src('src/server/static/**')
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest('src/server/static'));
});
