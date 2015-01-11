var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var requirejs = require('gulp-requirejs');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('run', function() {
	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client/*'
		]
	});
});

gulp.task('build', [ 'build-swarm' ], function() {

	var CONFIG_REQUIREJS = {
		baseUrl: 'src/client/require-config.js',
		out: 'client.js'
	};

	requirejs(CONFIG_REQUIREJS)
		.pipe(gulp.dest('dist'));

});

gulp.task('build-swarm', function() {

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify())
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest('src/client/lib'))
		.pipe(uglify())
		.pipe(rename('swarm-client.min.js'))
		.pipe(gulp.dest('src/client/lib'));

});
