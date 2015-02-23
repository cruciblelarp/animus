define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin/admin-config',
	'admin/characters/admin-characters-controller',
	'text!admin/characters/admin-characters-template.html'

], function(ng, _animus, _routing, _parent, _controller, _template) {
	var COMPONENT_NAME = 'admin.characters';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				parent: _parent,
				url: '/characters',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
