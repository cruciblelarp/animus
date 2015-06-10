define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/admin/admin-controller',

	'text!pages/admin/admin-template.html',
	'text!entities/entity-page.html',

	'entities/entity-list'

], function(ng, _animus, _routing, _controller, _template, _entityListTemplate) {
	var COMPONENT_NAME = 'admin';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/admin',
				controller: _controller,
				template: _template
			});

			$routing.state('admin.entities', {
				parent: COMPONENT_NAME,
				url: '/entities',
				template: _entityListTemplate
			});

		}
	]);

	return COMPONENT_NAME;
});
