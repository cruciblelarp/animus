define([

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service',

	'data/user-data'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'loginCtrl';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		_swarm,
		function($scope, $swarm) {

			_.extend($scope, {

				loading: {
					promise: $swarm.request('auth.status')
				},

				login: {
					username: null,
					password: null
				},

				signup: {
					email1: null,
					email2: null
				},

				$login: function ($event) {
					$event.preventDefault();
					$scope.loading.promise = $swarm.request('auth.login', $scope.login);
				},

				$register: function ($event) {
					$event.preventDefault();
					$scope.loading.promise = $swarm.request('auth.register', $scope.register);
				}

			});

			$scope.$watch('user', function(scopeuser) {
				user.set({
					username: scopeuser.username,
					password: scopeuser.password,
					email: scopeuser.email1
				});
			}, true);

		}
	]);

	return COMPONENT_NAME;
});
