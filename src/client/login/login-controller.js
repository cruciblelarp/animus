define('login/login-controller', [

	'underscore',
	'angular',

	'angular-module',
	'swarm/swarm-service'

], function(_, ng, _animus, _swarm) {
	var COMPONENT_NAME = 'loginCtrl';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		_swarm,
		function($scope, $swarm) {

			var user = $swarm.watch('user');
			user.on(function(spec, value, source) {
				_.extend($scope.user, {
					username: value.username,
					password: value.password,
					email1: value.email
				})
			});

			_.extend($scope, {

				user: {

					// Login vars
					username: null,
					password: null,

					// Signup vars
					email1: null,
					email2: null

				},

				login: function ($event) {
					$event.preventDefault();
				},

				register: function ($event) {
					$event.preventDefault();
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
