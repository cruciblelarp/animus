define([

	'underscore',
	'angular',

	'angular-module',
	'utils/util-service',
	'sockit/orchestrator',

	'utils/constants',

	'session/session-config'

], function(_, ng, _animus, _util, _orchestrator, $const) {
	var COMPONENT_NAME = '$session';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util, _orchestrator, '$http',
		function ($root, $util, $orchestrator, $http) {

			var $service = {};

			function saveUser(user) {

				if (!user) {
					var result = $orchestrator.destroy();
					return $util.resolve(result);
				}

				$root.session.userId = user.id;
				var entityKey = $const.TPL_KEY_ENTITY(user.id);

				$orchestrator.resource(entityKey, user);
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
				var entityKey = $const.TPL_KEY_ENTITY($root.session.userId);
				return $orchestrator.entity(entityKey);
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
