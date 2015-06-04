define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/account/account-controller',

	'text!pages/account/account-template.html'

], function(ng, _animus, _routing, _controller, _template) {
	var COMPONENT_NAME = 'account';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/account',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
