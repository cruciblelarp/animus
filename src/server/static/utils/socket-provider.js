define([

	'underscore',
	'angular',
	'socket',
	'uri',

	'angular-module'

], function(_, ng, socket, uri, _animus) {
	var COMPONENT_NAME = '$socket';

	ng.module(_animus).provider(COMPONENT_NAME, [
		function () {

			var configuration = {
				transports: [ 'websocket' ]
			};

			var $provider = {};

			$provider.configure = function(config) {
				configuration = _.defaults(config, configuration);
			};

			$provider.$get = function() {
				return socket(configuration);
			};

			return $provider;

		}
	]);

	return COMPONENT_NAME;
});
