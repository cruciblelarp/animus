'use strict';

/* globals module, require */

(function(){

	var config = {

		'paths': {
			'require': 'lib/require',
			'text': 'lib/text',
			'angular': 'lib/angular',
			'underscore': 'lib/underscore',
			'ui-router': 'lib/angular-ui-router',
			'ui-bootstrap': 'lib/ui-bootstrap',
			'ui-bootstrap-tpls': 'lib/ui-bootstrap-tpls',
			'angulartics': 'lib/angulartics',
			'angulartics-google': 'lib/angulartics-ga',
			'uri': 'lib/URI',
			'punycode': 'lib/punycode',
			'SecondLevelDomains': 'lib/SecondLevelDomains',
			'IPv6': 'lib/IPv6',
			'socket': 'lib/socket.io',
			'ngStorage': 'lib/ngStorage'
		},

		'shim': {

			'angular': {
				'exports': 'angular',
				'deps': [
					'require'
				]
			},

			'text': {
				'deps': [
					'require'
				]
			},

			'ui-router': {
				'deps': [
					'angular'
				]
			},

			'ui-bootstrap': {
				'deps': [
					'angular',
					'ui-bootstrap-tpls'
				]
			},

			'angulartics': {
				'exports': 'angulartics',
				'deps': [
					'angular'
				]
			},

			'angulartics-google': {
				'deps': [
					'angular',
					'angulartics'
				]
			},

			'ngStorage': {
				'deps': [
					'angular'
				]
			}

		},

		'deps': [
			'angular-bootstrap'
		]

	};

	if (typeof(module) !== 'undefined') {
		config.baseUrl = 'src/server/static';
		module.exports = config;
	} else {
		require.config(config);
	}

})();
