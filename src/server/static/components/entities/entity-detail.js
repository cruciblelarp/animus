define([

	'underscore',
	'angular',

	'angular-module',

	'ui-router',

	// Sub directives this directive uses.
	'components/entities/entity-detail-character'

], function(_, ng, _animus) {
	var COMPONENT_NAME = 'entityDetail';

	ng.module(_animus).directive(COMPONENT_NAME, function() {

		var controller = [
			'$scope', '$state', '$stateParams',
			function($scope, $state, $stateParams) {

				$scope.$watch('entityId', function(newVal, oldVal) {

					if (!newVal) {
						//
					}

				});

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

				$scope.reset = function() {
					$scope.editing = _.extend({}, $scope.selected);
					delete $scope.editing.$active;
				};

				$scope.save = function() {
					_.extend($scope.selected, $scope.editing);
				};

			}
		];

		return {
			restrict: 'A',
			controller: controller,
			template: template,
			isolate: true,
			scope: {

				/** The entity id to display */
				entityId: '=',

				/** Supply function to retrieve entity id to display. */
				getEntityId: '&'

			}
		};

	});

	return COMPONENT_NAME;
});
