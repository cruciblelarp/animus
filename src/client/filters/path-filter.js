define([

	'underscore',
	'angular',

	'angular-module',

	// non-injected dependencies
	'ui-router'

], function(_, ng, _animus) {
	var COMPONENT_NAME = 'pathParam';

	ng.module(_animus).filter(COMPONENT_NAME, [
		'$stateParams',
		function($stateParams) {

			return function(input) {
				return $stateParams[input];
			}

		}
	]);

	return COMPONENT_NAME;
});
