var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var requirejs = require('gulp-requirejs');

gulp.task('run', function() {
	nodemon({
		script: 'src/server/server.js',
		ext: 'html js css',
		ignore: [
			'src/client/*'
		]
	});
});

gulp.task('build', function() {
	requirejs({
		baseUrl: 'src/client/require-config.js',
		out: 'client.js',
	})
	.pipe(gulp.dest('dist'));
});

