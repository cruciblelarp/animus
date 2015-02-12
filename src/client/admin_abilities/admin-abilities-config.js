define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin_abilities/admin-abilities-controller'

], function(ng, _animus, _routing, _controller) {

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.state('admin.abilities', {
				url: '/abilities/{ability}',
				controller: _controller
			});

		}
	]);

});
