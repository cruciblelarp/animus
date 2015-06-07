define([

	'underscore',
	'angular',

	'angular-module',
	'alert/alert-service',
	'utils/util-service',
	'utils/routing-provider',
	'pages/admin/admin-config'

], function(_, ng, _animus, _alert, _utils, _routing, _admin) {
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

					$user.init(data.id, data.token);

					$routing.go(_admin);

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
