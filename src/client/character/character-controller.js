define('character/character-controller', [

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'characterCtrl';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		_swarm,
		function($scope, $swarm) {

			//

		}
	]);

	return COMPONENT_NAME;
});
