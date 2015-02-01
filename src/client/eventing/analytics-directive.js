define([

	'angular',

	'angular-module'

], function(ng, _animus) {
	var COMPONENT_NAME = 'structAnalytics';

	ng.module(_animus).directive(COMPONENT_NAME, [
		'$window',
		function($window) {

			var KEY_SERVICE = 'ga';
			var KEY_CODE = 'gaCode';
			var KEY_DOMAIN = 'gaDomain';

			$window['GoogleAnalyticsObject'] = KEY_SERVICE;

			var analytics = $window[KEY_SERVICE];
			if (!analytics) {

				analytics = function() {
					analytics.q.push(arguments);
				};

				analytics.q = [];
				analytics.l = new Date();

				$window[KEY_SERVICE] = analytics;

			}

			return {
				restrict: 'A',
				compile: function($element, $attrs) {
					var code = $attrs[KEY_CODE];
					var domain = $attrs[KEY_DOMAIN];
					analytics('create', code, domain);
				}
			};

		}
	]);

	return COMPONENT_NAME;
});
