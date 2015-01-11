var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var stringify = require('stringify');
var gulpif = require('gulp-if');

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

gulp.task('build-client', [ 'build-swarm' ], function() {

	gulp.src('src/client/*')
		.pipe(browserify({
			transform: stringify({
				extensions: [ '.html' ],
				minify: mode_prod
			})
		}))
		.pipe(gulpif(mode_prod, uglify()))
		.pipe(gulp.dest('src/server/static'));

});

gulp.task('build-styles', [], function() {

	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulpif(mode_prod, uglify()))
		.pipe(gulp.dest('src/server/static'));

});

gulp.task('build-swarm', function() {

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify())
		.pipe(rename('swarm-client.js'));

});
