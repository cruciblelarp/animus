define([

	'angular',
	'socket',
	'uri',

	'angular-module'

], function(ng, socket, uri, _animus) {
	var COMPONENT_NAME = '$socket';

	ng.module(_animus).provider(COMPONENT_NAME, [
		function () {

			var configuration = {};

			var $provider = {};

			$provider.config = function(config) {
				configuration = config;
			};

			$provider.$get = function() {
				return socket(configuration);
			};

			return $provider;

		}
	]);

	return COMPONENT_NAME;
});
