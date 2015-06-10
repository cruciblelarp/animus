define([

	'underscore',
	'angular',

	'angular-module',

	'utils/util-service',
	'utils/socket-provider',

	'session/session-config'

], function(_, ng, _animus, _util, _socket) {
	var COMPONENT_NAME = '$session';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util, '$sessionStorage', _socket,
		function ($rootScope, $util, $sessionStore, $socket) {

			$socket.on('sync', function(data) {
				_.each(data['updates'], function(update) {
					switch(update.type) {

						case 'remove':

							var lastPeriod = update.key.lastIndexOf('.');
							if (lastPeriod < 1) {
								delete $rootScope.session[update.key];
								return;
							}

							var parentKey = update.key.substring(0, lastPeriod);
							var parent = $util.$get($rootScope.session, parentKey);
							if (parent) {
								var childKey = update.key.substring(lastPeriod + 1);
								delete parent[childKey];
							}

							return;

						case 'replace':

							$util.$set($rootScope.session, update.key, update.value);

							return;

						case 'update':

							var object = $util.$get($rootScope.session, update.key);
							if (!object) {
								$util.$set($rootScope.session, update.key, update.value);
								return;
							}

							_.extend(object, update.value);

							return;

					}
				});
			});

			var $service = {};

			$service.login = function(email, password) {
				return $util.promise(function(resolve, reject) {

					$socket.emit('login', {
						email: email,
						password: password
					});

					$socket.on('login', function(data) {
						$socket.off('login');

						if (data.status !== 200) {
							reject(data.error);
						}

						resolve();

					});

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
