define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'alert/alert-service'

], function(ng, _animus, _routing, _alert) {
	var COMPONENT_NAME = '$util';

	ng.module(_animus).service(COMPONENT_NAME, [
		_alert, '$log', '$parse', '$q',
		function ($alert, $log, $parse, $q) {

			return $this = {

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

				resolve: $q.when,
				reject: $q.reject,
				all: $q.all,

			};
		}
	]);

	return COMPONENT_NAME;
});
