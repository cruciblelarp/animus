define([

	'angular',

	'angular-module',
	'components/account/account-service',

	'text!components/account/account-detail.html'

], function(ng, _animus, _account, template) {
	var COMPONENT_NAME = 'accountDetail';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		var controller = [
			'$scope', _account,
			function($scope, $account) {

				$scope.save = function($event, form) {
					$event.preventDefault();

					$scope.loading = $account.save(form).then(function() {

						$scope.$broadcast('alert', {
							flash: false,
							type: 'good',
							title: 'Update successful'
						});

					});

				};

				function load() {
					$scope.loading = $account.get().then(function(account) {
						$scope.pure = account;
						$scope.model = _.clone(account);
					});
				}

				$scope.reset = function($event, form) {
					$event.preventDefault();

					load();

				};

				// Load the data on page change.
				load();

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
