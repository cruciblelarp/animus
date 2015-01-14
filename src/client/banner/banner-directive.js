define([
	'angular',
	'text!banner/banner-template.html',
	'angular-module'
], function(ng, template) {

	ng.module('animus').directive('banner', function () {

		return {
			restrict: 'A',
			template: template
		};

	});

});
