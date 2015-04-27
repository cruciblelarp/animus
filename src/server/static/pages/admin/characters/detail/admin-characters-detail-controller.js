define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service',

	//'data/characters-data',

	'ui-router'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'adminCharactersDetailController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', _swarm, '$state', '$stateParams',
		function($scope, $swarm, $state, $stateParams) {

			$scope.$on('$stateChangeSuccess', function() {
				if ($state.includes('admin.characters.detail')) {
					$scope.selection = _.findWhere($scope.characters, {
						_id: $stateParams.ability
					});
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
