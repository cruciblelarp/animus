define([

	'angular',
	'data/request-data',

	'angular-module',
	'swarm/swarm-service'

], function(ng, Request, _animus, _swarm) {
	var COMPONENT_NAME = '$swarmRequest';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', '$q', _swarm,
		function($root, $q, $swarm) {

			var actions = {};

			var $service = _.extend({}, $swarm);

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
