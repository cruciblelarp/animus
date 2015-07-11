define([

	'angular',

	'angular-module',
	'utils/routing-provider',

	'text!pages/account/account-page.html'

], function(ng, _animus, _routing, _template) {
	var COMPONENT_NAME = 'account';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/account',
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
