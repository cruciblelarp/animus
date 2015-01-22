var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var manifest = require('gulp-cache-manifest');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var optimise = require('amd-optimize');
var concat = require('gulp-concat');

var mode_prod = false;

var WATCH_CFG_NOREAD = {
	read: false
};

gulp.task('run', [ 'build' ], function() {

	var lw = gulp.watch('node_modules', WATCH_CFG_NOREAD, [ 'libs' ]);
	var sw = gulp.watch('src/client/**.scss', WATCH_CFG_NOREAD, [ 'styles' ]);
	var cw = gulp.watch('src/client/**.js', WATCH_CFG_NOREAD, [ 'code' ]);

	var mw = gulp.watch([
		'src/server/static/**.js',
		'src/server/static/**.css',
		'src/server/static/**.html'
	], WATCH_CFG_NOREAD, [ 'manifest' ]);

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

	baseUrl: 'src/client',

	paths: {
		'require': 'lib/require',
		'text': 'lib/text',
		'angular': 'lib/angular',
		'underscore': 'lib/underscore',
		'swarm-client' : 'lib/swarm-client'
	},

	shim: {

		'angular': {
			exports: 'angular',
			deps: [
				'require'
			]
		},

		'text': {
			deps: [
				'require'
			]
		}

	}

};

gulp.task('code', function() {

	gulp.src('src/client/**.js')
		.pipe(optimise('angular-bootstrap', CONFIG_REQUIREJS))
		.pipe(concat('client.js'))
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
