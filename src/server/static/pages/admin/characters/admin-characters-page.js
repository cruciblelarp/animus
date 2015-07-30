define([

	'angular',

	'angular-module',
	'utils/routing-provider',

	'text!pages/admin/characters/admin-characters-page.html',

	// Directive used in page.
	'components/character/character-list',
	'filters/path-filter'

], function(ng, _animus, _routing, _template) {
	var COMPONENT_NAME = 'admin.characters';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state(COMPONENT_NAME, {
				url: '/admin/characters',
				template: _template,
				children: {

					detail: {
						url: '/{id:int}'
					}

				}
			});

		}
	]);

	return COMPONENT_NAME;
});
