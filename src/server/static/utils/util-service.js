define([

	'angular',

	'angular-module',
	'utils/routing-provider',
	'alert/alert-service'

], function(ng, _animus, _routing, _alert) {
	var COMPONENT_NAME = '$util';

	ng.module(_animus).service(COMPONENT_NAME, [
		_routing, _alert, '$log', '$parse',
		function (_routing, $alert, $log, $parse) {

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
				}

			};
		}
	]);

	return COMPONENT_NAME;
});
