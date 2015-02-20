define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin/abilities/admin-abilities-config',
	'admin/abilities/detail/admin-abilities-detail-controller',
	'text!admin/abilities/detail/admin-abilities-detail-template.html'

], function(ng, _animus, _routing, _parent, _controller, _template) {
	var COMPONENT_NAME = 'admin.abilities.detail';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				parent: _parent,
				url: '/{ability}',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
