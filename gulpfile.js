var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var stringify = require('stringify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');

var mode_prod = false;

gulp.task('run', [ 'build' ], function() {
	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client/*'
		]
	});
});

gulp.task('build', [
	'build-client',
	'build-styles'
]);

gulp.task('build-clean', function() {
	gulp.src('src/client/dist/**')
		.pipe(clean());
});

gulp.task('build-styles', function() {

	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/client/dist'));

});

var bundler = browserify({

	debug: !mode_prod,
	basedir: __dirname,

	// Watchify params
	cache: {},
	packageCache: {},
	fullPaths: true,

	entries: [
		'./src/client/banner/banner-directive.js',
		'./src/client/login/login-directive.js'
	],

	transform: [
		stringify({
			extensions: [ '.html' ],
			minify: mode_prod
		})
	]

});

function bundle(subject) {
	return function() {
		return subject.bundle()
			.on('error', function (error) {
				gutil.log('Browserify Error', error.stack);
				this.emit('end');
			})
			.pipe(source('client.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('src/client/dist'));
	}
}

gulp.task('build-client', bundle(bundler));

gulp.task('build-client-watch', function() {

	var watcher = watchify(bundler);
	watcher.on('update', bundle(watcher));

	return bundle(watcher);

});
