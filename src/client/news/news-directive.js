define([
	'angular-module',
	'news/news-controller',
	'text!news/news-template.html'
], function(animus, controller, template) {

	return animus.directive('panelNews', function() {

		return {
			restrict: 'A',
			replace: true,
			controller: controller,
			template: template,
			scope: true
		};

	})

});
