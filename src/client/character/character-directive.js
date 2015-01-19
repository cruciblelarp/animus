define('character/character-controller', [

	'angular',
	'text!character/character-template.html',

	'angular-module',
	'character/character-controller'

], function(ng, template, _animus, _controller) {
	var COMPONENT_NAME = 'panelCharacter';

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
