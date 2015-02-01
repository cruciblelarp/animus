define([

	'angular',
	'swarm-client',

	'angular-module'

], function(ng, swarm, _animus) {
	var COMPONENT_NAME = '$swarm';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$q',
		function($root, $q) {

			var host = new swarm.Host('cruciblemanager');

			$root.$watch('storage.config.swarmhost', function(newval, oldval) {

				if (!newval || newval != oldval) {
					host.disconnect();
				}

				if (newval) {
					host.connect(newval);
				}

			});

			return {

				watch: function(identifier) {
					return host.get('/' + identifier);
				},

				request: function(action, context) {
					var deferred = $q.defer();

					//TODO: Create request from action and context.
					var request = new Object();

					//TODO: Watch request for changes.
					request.on(function() {
						switch(request.status) {

							case 'complete':
								delete request; //stab in the dark.
								deferred.resolve(request);

						}
					});

					//TODO: Based on changes, resolve/reject promise.

					return deferred.promise;
				}

			}

		}
	]);

	return COMPONENT_NAME;
});
