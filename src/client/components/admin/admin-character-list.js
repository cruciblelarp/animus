define([

	'angular',
	'text!character/character-template.html',

	'angular-module'

], function(ng, template, _animus, _controller) {
	var COMPONENT_NAME = 'adminCharacterList';

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
