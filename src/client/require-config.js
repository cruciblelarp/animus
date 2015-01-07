require.config({
	
	paths: {
	    'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min',
	    'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
	    'css': 'https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css.min',
		'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min'
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
