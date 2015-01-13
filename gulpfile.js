var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var stringify = require('stringify');
var gulpif = require('gulp-if');
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
	'build-clean',
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

var bundler = watchify(browserify(watchify.args), {

	debug: !mode_prod,
	basedir: __dirname + '/src/client',
	cache: {},
	packageCache: {},
	fullPaths: true,

	entries: [
		'./angular-module.js',
		'./banner/banner-directive.js',
		'./login/login-directive'
	]

});

bundler.transform(stringify({
	extensions: [ '.html' ],
	minify: mode_prod
}));

function bundle() {
	return bundler.bundle()
		.pipe(source('client.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gulpif(mode_prod, uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/client/dist'));
}

gulp.task('build-client', bundle);
bundler.on('update', bundle);
