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

			function setSelection(_id) {

				$scope.selection = _.findWhere($scope.abilities, {
					_id: _id
				});

				//TODO: This needs more work to actually be useful.
				var dontIncludeList = [ $scope.selection ];
				$scope.prerequisites = _.select($scope.abilities, function(ability) {

					// Find whether there is something not to include in the list
					var shouldNotInclude = _.find(dontIncludeList, function(notIncludedItem) {

						// Is the ability already in the list for some reason?
						if (notIncludedItem === ability) {
							return true
						}

						// Does the ability rely on something not to include?
						var badPrereq = _.find(ability.prerequisites, function(prerequisite) {
							return prerequisite._id === notIncludedItem._id
								|| prerequisite.name === notIncludedItem.name;
						});

						if (badPrereq) {
							dontIncludeList.push(ability);
							return true;
						}

						return false;

					});

					return !shouldNotInclude;

				});

			}

			$scope.$on('$stateChangeSuccess', function() {
				if ($state.includes('admin.abilities.detail')) {
					setSelection(parseInt($stateParams['ability']));
				}
			});

		}
	]);

	return COMPONENT_NAME;
});
