require.config({

	paths: {

		'angular': [
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min',
			'lib/angular.min'
		],

		'text': [
			'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
			'lib/text.min'
		],

		'css': [
			'https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css.min',
			'lib/css.min'
		],

		'underscore': [
			'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
			'lib/underscore-min'
		],

		'bootstrap': [
			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min',
			'lib/bootstrap.min'
		],

		'swarm' : [
			'lib/swarm-client.min'
		]

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
