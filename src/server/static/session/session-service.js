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
					$sessionStore.clear();
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
				return $http.delete('/api/auth', {
				}).then(function() {
					return saveUser();
				});
			};

			$service.check = function() {
				var entityKey = $const.TPL_KEY_ENTITY($sessionStore[$const.KEY_LOGIN]);
				return $http.get('/api/auth', {
					email: $sessionStore[entityKey].email
				}).then(function(response) {
					return saveUser(response.data);
				});
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
