define([

	'angular',

	'angular-module'

], function(ng, _animus) {
	var COMPONENT_NAME = 'zoomControl';

	ng.module(_animus).directive(COMPONENT_NAME, [
		function() {
			var ZOOM_DISABLED = 'width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no, maximum-scale=1';
			var ZOOM_ENABLED = 'width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes';
			var ATTR_CONTENT = 'content';

			return {
				restrict: 'A',
				link: function($scope, $element) {

					var zoomDisable = function() {
						$element.attr(ATTR_CONTENT, ZOOM_DISABLED);
					};

					$scope.$on('$stateChangeStart', zoomDisable);

					var zoomEnable = function() {
						$element.attr(ATTR_CONTENT, ZOOM_ENABLED);
					};

					$scope.$on('$stateChangeSuccess', zoomEnable);
					$scope.$on('$stateChangeError', zoomEnable);
					$scope.$on('$stateNotFound', zoomEnable);

				}
			};

		}
	]);

	return COMPONENT_NAME;
});
