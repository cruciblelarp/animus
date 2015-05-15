define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/login/login-config'

], function(ng, _animus, _routing, _login) {
	var COMPONENT_NAME = 'pages';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.otherwise(_login);

		}
	]);

	return COMPONENT_NAME;
});
