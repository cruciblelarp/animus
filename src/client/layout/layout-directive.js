define([
	'angular',
	'text!layout/layout-template.html',
	'angular-module'
], function(ng, template) {

	ng.module('animus').directive('wrapLayout', function() {
		return {
			restrict: 'A',
			transclude: true,
			template: template
		}
	})

});
