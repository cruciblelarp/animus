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
		'banner/banner-directive',
		'login/login-directive',
		'news/news-directive',
		'character/character-directive',
		'layout/layout-directive'
	]

});
