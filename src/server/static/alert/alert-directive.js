define([

	'underscore',
	'angular',

	'angular-module',
	'network/provider-path',
	'alert/alert-service'

], function(_, ng, _animus, _pathProvider, _alertService) {
	var COMPONENT_NAME = 'alertDisplay';

	ng.module(_animus).directive(COMPONENT_NAME, [
		_pathProvider,
		_alertService,
		function(_path, _alert) {
			var PATH_TEMPLATE = _path.url('/pane/alert-display.html');

			var CLASS_TRANSLATIONS = {};
			CLASS_TRANSLATIONS[_alert.TYPE_ERROR]= 'alert-danger';
			CLASS_TRANSLATIONS[_alert.TYPE_WARN] = 'alert-warning';
			CLASS_TRANSLATIONS[_alert.TYPE_INFO] = 'alert-info';
			CLASS_TRANSLATIONS[_alert.TYPE_GOOD] = 'alert-success';

			var controller = [
				'$scope',
				function($scope) {

					_.extend($scope, {

						/**
						 * Compiles the full class list for a given alert based on the alert type and the additional
						 * classes configured during initial generation.
						 * @param {Object} alert The alert to generate classes for.
						 * @returns {Array} A potentially empty list.
						 */
						classes: function(alert) {

							// Take the additional classes and add the type class if possible.
							var alertClass = CLASS_TRANSLATIONS[alert.type];
							var alertClasses = alertClass
								? [ alertClass ]
								: [];

							return _.union(alert.classes || [], alertClasses);
						},

						/**
						 * Simply deletes the alert from storage.
						 * @param {Object} $event The UI event to cancel.
						 * @param {Object} alert The alert to delete.
						 */
						dismiss: function($event, alert) {
							$event && $event.preventDefault();
							_alert.remove(alert);
						}

					});

				}
			];

			return {
				restrict: 'A',
				replace: true,
				templateUrl: PATH_TEMPLATE,
				controller: controller
			};

		}
	]);

	return COMPONENT_NAME;
});
