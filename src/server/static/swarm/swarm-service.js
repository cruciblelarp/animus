define([

	'angular',
	'swarm-client',
	'data/request-data',

	'angular-module'

], function(ng, swarm, Request, _animus) {
	var COMPONENT_NAME = '$swarm';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$q',
		function($root, $q) {

			var host = new swarm.Host('animus');

			var actions = {};

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

			$service.request = function(action, context) {

				if (actions[action]) {
					return actions[action];
				}

				var deferred = $q.defer();

				try {

					// Create request from action and context.
					var request = new Request({
						time: new Date().getUTCDate(),
						action: action,
						context: context || {},
						status: 'created'
					});

					// Watch request for changes.
					request.on(function () {
						switch (request.status) {

							case 'resolved':
								deferred.resolve(request);
								delete actions[action];
								return;

							case 'rejected':
								deferred.reject(request);
								delete actions[action];
								return;

						}
					});
				} catch (error) {
					deferred.reject(error);
				}

				return actions[action] = deferred.promise;

			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
