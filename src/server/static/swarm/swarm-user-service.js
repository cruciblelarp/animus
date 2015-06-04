define([

	'angular',
	'swarm-client',
	'data/user-data',

	'angular-module',
	'swarm/swarm-service'

], function(ng, swarm, User, _animus, _swarm, _utils) {
	var COMPONENT_NAME = '$swarmUser';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$q', _swarm,
		function($root, $q, $swarm) {

			var user = null;

			var $service = _.extend({}, $swarm);

			$service.init = function(identifier, token) {

				if (user) {
					throw new Error('Already logged-in!');
				}

				var user = new User(identifier, $service.getHost());
				user.on('init', function(spec, val, source) {
					user.token = token;
				});

				user.on(function(spec, val, source) {
					console.log('sfegsgsegf');
				});

			};

			$service.getUser = function() {
				return user;
			};

			$service.isLoggedIn = function() {
				return user != null;
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
