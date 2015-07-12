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

				resolve: $q.when,
				reject: $q.reject,
				all: $q.all,

				listChanges: function(listFrom, listTo, properties, identifier) {

					var report = {
						removed: [],
						changed: [],
						added: [],
						same: []
					};

					report.removed = _.findAll(listFrom, function(itemFrom) {
						var dest = 'removed';

						_.each(listTo, function(itemTo) {

							if (!_.isUndefined(identifier)) {
								if(itemFrom[identifier] === itemTo[identifier]) {
									// These identifiers don't match. No need to check anything else.
									return;
								}
							}

							var propertiesMatch = true;
							_.find(properties, function(property) {

								propertiesMatch &= itemFrom[property] && toHasProperty;

								if (!propertiesMatch) {
									return true;
								}

							});

							if (propertiesMatch) {
								dest = 'same';
								return true;
							}

							if (!_.isUndefined(identifier)) {
								dest = 'changed';
								return true;
							}

						});

						report[dest] = itemFrom;

					});

					return report;
				}

			};
		}
	]);

	return COMPONENT_NAME;
});
