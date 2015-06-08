define([

	'angular',
	'socket',

	'angular-module'

], function(ng, socket, _animus) {
	var COMPONENT_NAME = '$socket';

	ng.module(_animus).provider(COMPONENT_NAME, [
		function () {

			var config = {};

			var $provider = {};

			$provider.config = function(new_config) {
				config = new_config;
			};

			$provider.$get = function() {
				return socket(config);
			};

			return $provider;

		}
	]);

	return COMPONENT_NAME;
});
