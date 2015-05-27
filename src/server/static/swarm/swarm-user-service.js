define([

	'angular',
	'swarm-client',
	'data/user-data',

	'angular-module',
	'swarm/swarm-service',
	'utils/util-service'

], function(ng, swarm, User, _animus, _swarm, _utils) {
	var COMPONENT_NAME = '$swarmUser';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$q', _swarm, _utils,
		function($root, $q, $swarm, $utils) {

			var user = null;

			var $service = _.extend({}, $swarm);

			$service.init = function(identifier, token) {

				if (user) {
					throw new Error('Already logged-in!');
				}

				//user = new User(identifier, $service.getHost());
				user = {
					id: identifier,
					token: token
				};

				$utils.$set($root, 'session.token', token);

			};

			$service.isLoggedIn = function() {
				return user != null;
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
