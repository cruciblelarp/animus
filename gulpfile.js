var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var manifest = require('gulp-cache-manifest');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var optimise = require('amd-optimize');
var jade = require('gulp-jade');
var reduce = require('stream-reduce');
var path = require('path');

var mode_prod = false;

var PATH_STATIC = 'src/server/static';
var PATH_STATIC_ABS = path.resolve(__dirname, PATH_STATIC);

var WATCH_CFG_NOREAD = {
	read: false
};

gulp.task('run', [ 'build' ], function() {

	var lw = gulp.watch('node_modules', WATCH_CFG_NOREAD, [ 'libs' ]);
	var sw = gulp.watch('src/client/**.scss', WATCH_CFG_NOREAD, [ 'styles' ]);
	var cw = gulp.watch('src/client/**.js', WATCH_CFG_NOREAD, [ 'code' ]);

	var mw = gulp.watch([
		PATH_STATIC + '/**.js',
		PATH_STATIC + '/**.css',
		PATH_STATIC + '/**.jade'
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
		'swarm-client' : 'lib/swarm-client',
		'ui-router': 'lib/angular-ui-router',
		'ui-bootstrap': 'lib/ui-bootstrap',
		'ui-bootstrap-tpls': 'lib/ui-bootstrap-tpls',
		'angulartics': 'lib/angulartics',
		'angulartics-google': 'lib/angulartics-ga'
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
		},

		'swarm-client': {
			exports: 'Swarm',
			deps: [
				'require'
			]
		},

		'ui-router': {
			deps: [
				'angular'
			]
		},

		'ui-bootstrap': {
			deps: [
				'angular',
				'ui-bootstrap-tpls'
			]
		},

		'angulartics': {
			deps: [
				'angular'
			]
		},

		'angulartics-google': {
			deps: [
				'angular',
				'angulartics'
			]
		}

	}

};

function amd_reduction(memo, item) {
	memo.push(path.relative(PATH_STATIC_ABS, item.path));
	return memo;
}

gulp.task('code', [ 'libs' ], function() {

	gulp.src('src/client/**.js')
		.pipe(optimise('angular-bootstrap', CONFIG_REQUIREJS))
		.pipe(gulp.dest(PATH_STATIC))
		.pipe(reduce(amd_reduction, []))
		.on('data', function(list) {

			var config_jade = {
				pretty: '\t',
				data: {
					scripts: list
				}
			};
			
			gulp.src('src/client/client.jade')
				.pipe(jade(config_jade))
				.pipe(gulp.dest(PATH_STATIC));

		});


});

gulp.task('libs', function() {

	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/requirejs/require.js',
		'node_modules/requirejs-text/text.js',
		'node_modules/underscore/underscore.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap.js',
		'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.js',
		'node_modules/angulartics/src/angulartics.js',
		'node_modules/angulartics/src/angulartics-ga.js'
	]).pipe(gulp.dest('src/client/lib'));

	gulp.src('node_modules/swarm/lib/Html5Client.js')
		.pipe(browserify({ debug: false }))
		.pipe(rename('swarm-client.js'))
		.pipe(gulp.dest('src/client/lib'));

});

gulp.task('clean', function() {
	gulp.src([
		PATH_STATIC,
		'src/client/lib'
	]).pipe(clean({
		force: true
	}));
});

gulp.task('styles', function() {
	gulp.src('src/client/**.scss')
		.pipe(sass())
		.pipe(gulp.dest(PATH_STATIC));
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
		.pipe(gulp.dest(PATH_STATIC));
});
