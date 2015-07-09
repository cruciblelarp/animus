define([

	'underscore',
	'angular',

	'angular-module',

	'utils/util-service',

	'session/session-config'

], function(_, ng, _animus, _util) {
	var COMPONENT_NAME = '$session';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util, '$sessionStorage', '$http',
		function ($rootScope, $util, $sessionStore, $http) {

			var $service = {};

			$service.login = function(email, password) {
				return $http.post('/api/auth', {
					email: email,
					password: password
				}).then(function(user) {
					var entityKey = 'entity[' + user.id + ']';
					$sessionStore[entityKey] = user;
					$sessionStore.loginId = user.id;
					return $util.resolve(user);
				});
			};

			$service.logout = function() {
				return $util.promise(function(resolve, reject) {

					socket.send('logout', {});

					socket.on('logout', function(data) {
						$socket.off('logout');
						$sessionStore.clear();
						data.error
							? reject(data.error)
							: resolve();
					});

				});

			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
