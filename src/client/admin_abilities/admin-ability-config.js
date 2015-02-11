define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin_abilities/admin-ability-controller',

	'text!admin_abilities/admin-ability-list.html',
	'text!admin_abilities/admin-ability-detail.html'

], function(ng, _animus, _routing, _controller, _listTemplate, _detailTemplate) {

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.states({

				'admin.abilities': {
					parent: 'admin',
					url: '/abilities',
					controller: _controller,
					template: _listTemplate,
					children: {

						'admin.abilities.detail': {
							url: '/{ability}',
							template: _detailTemplate
						}

					}
				}

			});

		}
	]);

});
