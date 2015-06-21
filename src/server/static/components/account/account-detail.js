define([

	'angular',

	'angular-module',
	'components/account/account-service',

	'text!components/account/account-detail.html'

], function(ng, _animus, _search, template) {
	var COMPONENT_NAME = 'entityList';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		var controller = [
			'$scope', _search,
			function($scope, $search) {

				$scope.save = function($event, form) {
					//
				};

				$scope.reset = function($event, form) {
					//
				};

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
