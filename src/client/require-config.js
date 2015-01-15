require.config({

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

	},

	deps: [
		'banner/banner-directive.js',
		'login/login-directive.js',
		'news/news-directive.js',
		'layout/layout-directive.js'
	]

});
