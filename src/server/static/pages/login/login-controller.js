define([

	'underscore',
	'angular',

	'angular-module',
	'alert/alert-service',
	'utils/util-service',
	'utils/routing-provider',
	'pages/admin/admin-config',
	'session/session-service'

], function(_, ng, _animus, _alert, _utils, _routing, _admin, _session) {
	var COMPONENT_NAME = 'loginController';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope', '$http', _alert, _utils, _routing, _session,
		function($scope, $http, $alert, $utils, $routing, $session) {

			$scope.loading = null;

			$scope.login = function($event) {
				$event.preventDefault();

				$scope.loading = $session.login($scope.email, $scope.password);

			}

		}
	]);

	return COMPONENT_NAME;
});
