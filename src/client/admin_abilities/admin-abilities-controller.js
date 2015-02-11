define([

	'underscore',
	'angular',

	'angular-module'

], function(_, ng, _animus) {
	var COMPONENT_NAME = 'adminAbilitiesController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', '$swarm',
		function($scope, $swarm) {

			$scope.abilities = $swarm.watch('abilities');

		}
	]);

	return COMPONENT_NAME;
});
