define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'admin/admin-controller',

	'text!admin/admin-dashboard.html'

], function(ng, _animus, _routing, _controller, _template) {

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.states({

				'admin': {
					url: '/admin',
					controller: _controller,
					template: _template
				}

			});

		}
	]);

});
