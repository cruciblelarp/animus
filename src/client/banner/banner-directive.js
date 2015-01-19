define('banner/banner-directive', [

	'angular',
	'text!banner/banner-template.html',

	'angular-module'

], function(ng, template, _animus) {
	var COMPONENT_NAME = 'panelBanner';

	ng.module(_animus).directive(COMPONENT_NAME, function () {

		return {
			restrict: 'A',
			replace: true,
			template: template
		};

	});

	return COMPONENT_NAME;
});
