define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/login/login-controller',

	'text!pages/login/login-template.html'

], function(ng, _animus, _routing, _controller, _template) {
	var COMPONENT_NAME = 'login';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/login',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
