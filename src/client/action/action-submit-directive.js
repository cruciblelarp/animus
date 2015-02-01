define([

	'angular',

	'angular-module',
	'alert/alert-service',

	'angulartics'

], function(ng, _animus, _alert) {
	var COMPONENT_NAME = 'actionSubmit';

	ng.module(_animus).directive(COMPONENT_NAME, [
		'$analytics', _alert,
		function($analytics, $alert) {

			function processSubmit($event) {

				// Clear any displayed alerts to make room for new ones.
				$alert.clear();

				// Log the submit with analytics.
				var $target = $event.target;
				$analytics.eventTrack('submit', {
					category: 'action',
					label: $target.id
				});

			}

			return {
				restrict: 'A',
				compile: function($element, $attrs) {
					var trigger = $attrs['actionSubmit'];
					if (trigger) {
						$element.bind(trigger, processSubmit);
					}
				}
			};

		}
	]);

	return COMPONENT_NAME;
});

