define([

	'underscore',
	'angular',
	'uri',

	'angular-module'

], function(_, ng, URI, _animus) {
	var COMPONENT_NAME = '$path';

	ng.module(_animus).provider(COMPONENT_NAME, function() {
		var initUri = new URI();

		var base = initUri.protocol() + '://' + initUri.host();
		var context = initUri.path().replace(/\/app\/.*$/, '');

		var $provider = {

			url: function(path, contextOverride) {
				var ctx = _.isString(contextOverride)
					? contextOverride
					: context;
				return base + ( ctx + path ).replace('//', '/');
			}

		};

		$provider.$get = [
			'$location',
			function($location) {

				var $service = {

					url: $provider.url,

					current: $location.absUrl

				};

				return $service;

			}
		];

		return _.extend(this, $provider);

	});

});
