define('news/news-directive', [

	'angular',
	'text!news/news-template.html',

	'angular-module',
	'news/news-controller'

], function(ng, template, _animus, _controller) {
	var COMPONENT_NAME = 'panelNews';

	ng.module(_animus).directive(COMPONENT_NAME, function() {

		return {
			restrict: 'A',
			replace: true,
			controller: _controller,
			template: template,
			scope: true
		};

	});

	return COMPONENT_NAME;
});
