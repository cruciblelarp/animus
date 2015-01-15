define([
	'angular-module',
	'text!layout/layout-template.html'
], function(animus, template) {

	animus.directive('wrapLayout', function() {
		return {
			restrict: 'A',
			transclude: true,
			template: template
		}
	})

});
