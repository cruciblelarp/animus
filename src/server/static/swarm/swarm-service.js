define([

	'angular',
	'swarm-client',

	'angular-module',
	'utils/util-service'

], function(ng, swarm, _animus, _utils) {
	var COMPONENT_NAME = '$swarm';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$http', _utils,
		function($root, $http, $utils) {

			var host = new swarm.Host('swarm~nodejs');

			$root.$watch('storage.config.swarmhost', function(newval, oldval) {

				if (!newval || newval != oldval) {
					host.disconnect();
				}

				if (newval) {
					host.connect('ws://' + newval);
				}

			});

			$http.defaults.transformResponse.push(function(payload, headers, status) {
				if (status === 200) {
					var swarmhost = headers('x-swarm-host');
					if (swarmhost) {
						$utils.$set($root, 'storage.config.swarmhost', swarmhost);
					}
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
