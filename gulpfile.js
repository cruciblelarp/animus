var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var manifest = require('gulp-cache-manifest');
var requirejs = require('gulp-requirejs');

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
	'build-styles',
	'build-manifest'
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

var CONFIG_MANIFEST = {
	hash: true,
	exclude: [
		'src/client/dist/app.manifest'
	]
};

gulp.task('build-manifest', function() {
	gulp.src('src/client/**')
		.pipe(manifest(CONFIG_MANIFEST))
		.pipe(gulp.dest('src/client/dist'));
});
