define([
	'angular-module',
	'character/character-controller',
	'text!character/character-template.html'
], function(animus, controller, template) {

	animus.directive('panelCharacter', function() {

		return {
			restrict: 'A',
			replace: true,
			controller: controller,
			template: template,
			scope: {}
		};

	})

});
