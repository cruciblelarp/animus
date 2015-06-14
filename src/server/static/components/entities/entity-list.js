define([

	'angular',

	'angular-module',
	'components/entities/entity-search',

	'text!entities/entity-list.html',

	// Sub-directive this directive uses.
	'components/entities/entity-detail'

], function(ng, _animus, _search, template) {
	var COMPONENT_NAME = 'entityList';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		var controller = [
			'$scope', _search,
			function($scope, $search) {

				$scope.$watch('search', function(filter) {
					$scope.entities = $search(filter);
				});

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
