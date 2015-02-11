define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin_characters/admin-character-controller',

	'text!admin_characters/admin-character-list.html',
	'text!admin_characters/admin-character-detail.html'

], function(ng, _animus, _routing, _controller, _listTemplate, _detailTemplate) {

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.states({

				'admin.characters': {
					parent: 'admin',
					url: '/characters',
					controller: _controller,
					template: _listTemplate,
					children: {

						'admin.characters.detail': {
							url: '/{character}',
							template: _detailTemplate
						}

					}
				}

			});

		}
	]);

});
