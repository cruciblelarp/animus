require.config({

	paths: {
		'angular': 'lib/angular',
		'text': 'lib/text',
		'css': 'lib/css',
		'underscore': 'lib/underscore',
		'bootstrap': 'lib/bootstrap',
		'swarm' : 'lib/swarm-client'
	},

	shim: {

		'angular': {
			exports: 'angular'
		},

		'underscore': {
			exports: '_'
		}

	},

	deps: [
		'banner/banner-directive.js',
		'login/login-directive.js'
	]

});
