define([

	'underscore',
	'angular',

	'angular-module',
	'utils/routing-provider',
	'pages/login/login-config',
	'pages/admin/admin-config'

], function(_, ng, _animus, _routing, _login, _admin) {

	ng.module(_animus).run([
		'$rootScope', _routing,
		function($rootScope, $routing) {

			$rootScope.$on('$stateChangeStart', function(event, next) {

				var loggedIn = $user.isLoggedIn();
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
