define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'alert/alert-service'

], function(ng, _animus, _routing, _alert) {
	var COMPONENT_NAME = '$util';

	ng.module(_animus).service(COMPONENT_NAME, [
		_routing, _alert, '$log', '$parse', '$q',
		function (_routing, $alert, $log, $parse, $q) {

			return $this = {

				handleError: function (error, context) {
					switch (context.status) {
						case 401:
							$log.warn(error);
							_routing.go('login');
							break;
						default:
							$log.error(error);
							$alert.error({
								contentKey: error.error
							});
							break;
					}
				},

				singleton: function(key, value) {
					var map = {};
					map[key] = value;
					return map;
				},

				$parse: $parse,

				$set: function(target, key, value) {
					$parse(key).assign(target, value);
				},

				$get: function(target, key) {
					return $parse(key)(target);
				},

				promise: function(callback) {
					var deferred = $q.defer();

					callback.call(
						deferred,
						deferred.resolve,
						deferred.reject,
						deferred.notify
					);

					return deferred.promise;
				},

				listChanges: function(listFrom, listTo, properties) {

					var report = {
						removed: [],
						changed: [],
						added: [],
						same: []
					};

					_.each(listFrom, function(itemFrom) {
						var des
						_.each(listTo, function(itemTo) {




						});
					});

					return report;
				}

			};
		}
	]);

	return COMPONENT_NAME;
});
