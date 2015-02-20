define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin/admin-controller',

	'text!admin/admin-template.html'

], function(ng, _animus, _routing, _controller, _template) {
	var COMPONENT_NAME = 'admin';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/admin',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
