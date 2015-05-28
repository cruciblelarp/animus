define([

	'angular',
	'swarm-client',

	'angular-module'

], function(ng, swarm, _animus) {
	var COMPONENT_NAME = '$swarm';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope',
		function($root) {

			var host = new swarm.Host('animus');

			$root.$watch('storage.config.swarmhost', function(newval, oldval) {

				if (!newval || newval != oldval) {
					host.disconnect();
				}

				if (newval) {
					host.connect(newval);
				}

			});

			var $service = {};

			$service.watch = function(identifier) {
				return host.get('/' + identifier);
			};

			$service.getHost = function() {
				return host;
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
