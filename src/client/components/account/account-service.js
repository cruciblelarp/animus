define([

	'underscore',
	'angular',

	'angular-module',
	'session/session-service'

], function(_, ng, _animus, _session) {
	var COMPONENT_NAME = '$account';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _session, '$http',
		function ($root, $session, $http) {

			var $service = {};

			$service.get = $session.check;

			$service.save = function(account) {

				return $http.put('/user', account).then(function() {
					return $service.get();
				});

			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
