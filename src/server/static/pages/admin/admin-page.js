define([

	'angular',

	'angular-module',
	'utils/routing-provider',

	'text!pages/admin/admin-page.html',

	// Directive used in page.
	'components/entities/entity-list',
	'pages/admin/characters/admin-characters-page'

], function(ng, _animus, _routing, _tplAdminPage) {
	var COMPONENT_NAME = 'admin';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/admin',
				template: _tplAdminPage,
				children: {
					'admin.detail': {
						url: '/{id}'
					}
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
