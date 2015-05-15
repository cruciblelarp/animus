define([

	'underscore',
	'angular',

	'angular-module',
	'alert/alert-service',
	'utils/util-service',
	'utils/routing-provider'

], function(_, ng, _animus, _alert, _utils) {
	var COMPONENT_NAME = 'loginController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', '$http', _alert, _utils, _routing,
		function($scope, $http, $alert, $utils, $routing) {

			$scope.login = function($event) {
				$event.preventDefault();

				$http.post('/login', {
					email: $scope.email,
					password: $scope.password
				}).then(function(data) {

					$utils.$set($scope.$root, 'session.token', data.token);
					$routing.go('main');

				}).catch(function(error) {

					$alert.display({
						type: $alert.TYPE_ERROR,
						title: 'Error while logging in',
						body: error
					});

				});

			}

		}
	]);

	return COMPONENT_NAME;
});
