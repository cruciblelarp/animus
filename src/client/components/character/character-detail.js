define([

	'angular',

	'angular-module',
	'utils/util-service',

	'text!components/character/character-detail.html'

], function(ng, _animus, _util, template) {
	var COMPONENT_NAME = 'componentCharacterDetail';

	ng.module(_animus).directive(COMPONENT_NAME, function() {

		return {
			restrict: 'A',
			replace: true,
			template: template,

			scope: {
				selected: '='
			},

			controller: [
				'$scope', _util,
				function($scope, $util) {

					$scope.$watch('selected', function(character) {

						if (!character) {
							return;
						}

						var loading = character['loading']
							|| $util.resolve(character);

						$scope.loading = loading.then(function(character) {
							$scope.target = character;
						});

					});

					$scope.$watch('target', function(target) {
						$scope.editing = _.clone(target);
					}, true);

				}
			]

		};

	});

	return COMPONENT_NAME;
});
