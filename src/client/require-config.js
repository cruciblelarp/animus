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
		'angular-bootstrap'
	]

});
