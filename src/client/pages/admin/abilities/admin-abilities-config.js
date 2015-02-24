define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/admin/admin-config',
	'pages/admin/abilities/admin-abilities-controller',
	'text!pages/admin/abilities/admin-abilities-template.html'

], function(ng, _animus, _routing, _parent, _controller, _template) {
	var COMPONENT_NAME = 'admin.abilities';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.states({

				'admin.abilities': {
					parent: _parent,
					url: '/abilities',
					controller: _controller,
					template: _template
				}

			});

		}
	]);

	return COMPONENT_NAME;
});
