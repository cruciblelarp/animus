define([

	'underscore',
	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/login/login-config',
	'pages/admin/admin-page',
	'utils/util-service'

], function(_, ng, _animus, _routing, _login, _admin, _util) {

	ng.module(_animus).run([
		'$rootScope', _routing, '$sessionStorage', _util,
		function($rootScope, $routing, $sessionStorage, $util) {

			$rootScope.$on('$stateChangeStart', function(event, next) {

				var loggedIn = !!$util.$get($sessionStorage, 'user.id');
				var toLogin = next.name.indexOf(_login) === 0;

				if (loggedIn && !toLogin || !loggedIn && toLogin) {
					// no need to interrupt anything.
					return;
				}

				event.preventDefault();
				$routing.go(loggedIn ? _admin : _login);

			});

		}
	]);

});
