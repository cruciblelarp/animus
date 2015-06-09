define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/account/account-config',
	'pages/account/details/account-details-controller',
	'text!pages/account/details/account-details-template.html'

], function(ng, _animus, _routing, _parent, _controller, _template) {
	var COMPONENT_NAME = 'account.details';

	ng.module(_animus).config([
		_routing + 'Provider',
		function($routing) {

			$routing.states({

				'account.details': {
					parent: _parent,
					url: '/details',
					controller: _controller,
					template: _template
				}

			});

		}
	]);

	return COMPONENT_NAME;
});
