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

				if (!$state.includes('admin.characters.detail')) {
					return;
				}

				if ($scope.selected && $scope.selected.$active) {
					delete $scope.selected.$active;
				}

				if (!$scope.characters) {
					throw "No characters to view the details for.";
				}

				var _id = parseInt($stateParams['character']);
				$scope.selected = _.findWhere($scope.characters, {
					_id: _id
				});

				if ($scope.characters && !$scope.selected) {
					throw "Couldn't find _id:" + _id + " in character list";
				}

				$scope.editing = _.extend({}, $scope.selected);

				$scope.selected.$active = true;

			});

		}
	]);

	return COMPONENT_NAME;
});
