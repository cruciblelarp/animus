define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service',

	//'data/abilities-data',

	'ui-router'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'adminAbilitiesDetailController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _swarm, '$state', '$stateParams',
		function($scope, $swarm, $state, $stateParams) {

			$scope.$on('$stateChangeSuccess', function() {
				if ($state.includes('admin.abilities.detail')) {
					$scope.selection = _.findWhere($scope.abilities, {
						_id: $stateParams.ability
					});
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
