define([
	'angular',
	'text!banner/banner-template.html',
	'angular-module'
], function(ng, template) {

	ng.module('animus').directive('panelBanner', function () {

		return {
			restrict: 'A',
			template: template
		};

	});

});
