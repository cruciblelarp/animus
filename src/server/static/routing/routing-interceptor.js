define([

	'underscore',
	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/login/login-config',
	'pages/admin/admin-page',
	'utils/util-service',
	'utils/constants'

], function(_, ng, _animus, _routing, _login, _admin, _util, $const) {

	ng.module(_animus).run([
		'$rootScope', _routing, '$sessionStorage', _util,
		function($rootScope, $routing, $sessionStorage, $util) {

			$rootScope.$on('$stateChangeStart', function(event, next) {

				var loggedIn = !!$util.$get($sessionStorage, $const.KEY_LOGIN);
				var toLogin = next.name.indexOf(_login) === 0;

				if (loggedIn && !toLogin || !loggedIn && toLogin) {
					// no need to interrupt anything.
					return;
				}

				event.preventDefault();
				$routing.go(loggedIn ? _admin : _login);

			});

			$rootScope.$on('$errorUnauthorised', function() {
				$util.$set($sessionStorage, $const.KEY_LOGIN, null);
			});

		}
	]);

	ng.module(_animus).config([
		'$httpProvider',
		function($httpProvider) {

			$httpProvider.interceptors.push([
				'$rootScope', '$q', '$log',
				function($root, $q, $log) {

					return {

						responseError: function(rejection) {

							switch(rejection.status) {

								case 401:
									$log.warn('Error received: Unauthorised');
									$root.$emit('$errorUnauthorised');
									break;

								case 403:
									$log.warn('Error received: Forbidden');
									$root.$emit('$errorForbidden');
									break;

								case 500:
									$log.warn('Error received: Server');
									$root.$emit('$errorServer');
									break;

							}

							return $q.reject(rejection);

						}

					}

				}
			])

		}
	]);

});
