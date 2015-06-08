define([

	'underscore',
	'angular',
	'socket',

	'angular-module',

	'utils/util-service'

], function(_, ng, socket, _animus, _util) {
	var COMPONENT_NAME = '$session';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util, '$sessionStore',
		function ($rootScope, $util, $sessionStore) {

			socket.on('sync', function(data) {
				_.each(data['updates'], function(update) {
					switch(update.type) {

						case 'remove':

							var lastPeriod = update.key.lastIndexOf('.');
							if (lastPeriod < 1) {
								delete $sessionStore[update.key];
								return;
							}

							var parentKey = update.key.substring(0, lastPeriod);
							var parent = $util.$get($sessionStore, parentKey);
							if (parent) {
								var childKey = update.key.substring(lastPeriod + 1);
								delete parent[childKey];
							}

							return;

						case 'replace':

							$util.$set($sessionStore, update.key, update.value);

							return;

						case 'update':

							var object = $util.$get($sessionStore, update.key);
							if (!object) {
								$util.$set($sessionStore, update.key, update.value);
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

					socket.send('login', {
						email: email,
						password: password
					});

					socket.on('login', function(data) {
						if (data.status === 200) {
							resolve();
						} else {
							reject(data.error);
						}
					});

				});
			};

			$service.logout = function() {
				socket.send('logout', {});
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
