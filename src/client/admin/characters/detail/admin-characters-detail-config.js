define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin/characters/admin-characters-config',
	'admin/characters/detail/admin-characters-detail-controller',
	'text!admin/characters/detail/admin-characters-detail-template.html'

], function(ng, _animus, _routing, _parent, _controller, _template) {
	var COMPONENT_NAME = 'admin.characters.detail';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				parent: _parent,
				url: '/{character}',
				controller: _controller,
				template: _template
			});

		}
	]);

	return COMPONENT_NAME;
});
