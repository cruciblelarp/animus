define([
	'angular-module',
	'text!banner/banner-template.html'
], function(animus, template) {

	return animus.directive('panelBanner', function () {

		return {
			restrict: 'A',
			replace: true,
			template: template,
			scope: true
		};

	});

});
