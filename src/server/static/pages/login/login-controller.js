define([

	'underscore',
	'angular',

	'angular-module',
	'alert/alert-service'

], function(_, ng, _animus, _alert) {
	var COMPONENT_NAME = 'loginController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', '$http', _alert,
		function($scope, $http, $alert) {

			$scope.login = function($event) {
				$event.preventDefault();

				$http.post('/login', {
					email: $scope.email,
					password: $scope.password
				}).then(function(data) {

					$scope.$root.session.token = data.token;

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
