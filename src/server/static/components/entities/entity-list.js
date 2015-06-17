define([

	'angular',

	'angular-module',
	'components/entities/entity-search',

	'text!components/entities/entity-list.html',

	// Sub-directive this directive uses.
	'components/entities/entity-detail'

], function(ng, _animus, _search, template) {
	var COMPONENT_NAME = 'entityList';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		var controller = [
			'$scope', _search,
			function($scope, $search) {

				function doSearch() {

					var filter = $scope.search;
					var entities = $scope.$root.session.entities;
					if (!filter) {
						$scope.entities = _.clone(entities);
						return;
					}

					var results = $search(filter);
					$scope.entities = _.filter(entities, function(entity) {
						return _.findWhere(results, {
							ref: entity.id.toString()
						});
					});

				}

				$scope.$watchCollection('session.entities', doSearch);
				$scope.$watch('search', doSearch);

				$scope.noop = function($event) {
					$event.preventDefault();
				}

			}
		];

		return {
			restrict: 'A',
			replace: true,
			template: template,
			controller: controller,
			isolate: true
		};

	});

	return COMPONENT_NAME;
});
