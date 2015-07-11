define([

	'underscore',
	'angular',

	'angular-module',

	'utils/util-service',
	'utils/constants',

	'session/session-config'

], function(_, ng, _animus, _util, $const) {
	var COMPONENT_NAME = '$session';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util, '$sessionStorage', '$http',
		function ($rootScope, $util, $sessionStore, $http) {

			var $service = {};

			function saveUser(user) {

				if (!user) {
					$sessionStore.$reset();
					return $util.resolve(undefined);
				}

				var entityKey = $const.TPL_KEY_ENTITY(user.id);
				$sessionStore[entityKey] = user;
				$sessionStore[$const.KEY_LOGIN] = user.id;
				return $util.resolve(user)

			}

			$service.login = function(email, password) {
				return $http.post('/api/auth', {
					email: email,
					password: password

				}).then(function(response) {
					return saveUser(response.data);
				});
			};

			$service.logout = function() {
				return $http.delete('/api/auth').then(function() {
					return saveUser();
				});
			};

			$service.current = function() {
				var currentId = $sessionStore[$const.KEY_LOGIN];
				var entityKey = $const.TPL_KEY_ENTITY(currentId);
				return $sessionStore[entityKey];
			};

			$service.check = function() {
				return $http.get('/api/auth').then(function(response) {
					return saveUser(response.data);
				}).catch(function(error) {
					return error.status === 401 && saveUser();
				});
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
