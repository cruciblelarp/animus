define([

	'angular',
	'moment',
	'swarm-client',
	'data/request-data',

	'angular-module'

], function(ng, moment, swarm, Request, _animus) {
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

					// Create request from action and context.
					var request = new Request({
						id: moment().unix(),
						action: action,
						context: context,
						status: 'new'
					});

					// Watch request for changes.
					request.on(function() {
						switch(request.status) {

							case 'resolved':
								deferred.resolve(request);
								delete request; //stab in the dark.
								return;

							case 'rejected':
								deferred.reject(request);
								delete request; //stab in the dark.
								return;

						}
					});

					return deferred.promise;
				}

			}

		}
	]);

	return COMPONENT_NAME;
});
