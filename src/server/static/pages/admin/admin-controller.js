define([

	'underscore',
	'angular',

	'angular-module'

], function(_, ng, _animus) {
	var COMPONENT_NAME = 'adminController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		function($scope) {

		}
	]);

	return COMPONENT_NAME;
});
