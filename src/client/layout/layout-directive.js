define([
	'angular',
	'text!layout/layout-template.html',
	'angular-module'
], function(ng, template) {

	ng.module('animus').directive('appLayout', function() {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			template: template
		}
	})

});
