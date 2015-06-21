define([

	'underscore',
	'angular',

	'angular-module'

], function(_, ng, _animus) {
	var COMPONENT_NAME = '$search';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope',
		function ($root) {

			var $service = {};

			$service.save = function(account) {
				//
			};

			return $service;

		}
	]);

	return COMPONENT_NAME;
});
