define([

	'underscore',
	'angular',

	'angular-module',
	'utils/util-service',
	'sockit/orchestrator',

	'text!components/character/character-list.html',

	// Needed angular components that don't need injection.
	'components/character/character-detail'

], function(_, ng, _animus, _util, _orchestrator, template) {
	var COMPONENT_NAME = 'componentCharacterList';

	ng.module(_animus).directive(COMPONENT_NAME, function() {

		return {
			restrict: 'A',
			replace: true,
			template: template,

			scope: {
				selected: '='
			},

			controller: [
				'$scope', _util, _orchestrator, '$http',
				function($scope, $util, $orchestrator, $http) {

					$scope.isSelected = function(character) {
						return character && character.id === $scope.selected;
					};

					// Start requesting the character detail.
					$scope.loading = $http.get('/api/admin/characters').then(function(response) {
						$orchestrator.collection('/admin/characters', response.data);
						$scope.characters = _.collect(response.data, function(characterId) {

							var character = {
								id: characterId
							};

							var resource = '/admin/characters/' + characterId;

							character.loading = $http.get(resource).then(function(response) {
								$orchestrator.resource(resource, response.data);
								character.name = response.data.name;
								return $util.resolve(character);

							}, function(error) {
								console.error(error.stack || error.message || error);
							});

							return character;

						});

					}, function(error) {
						console.error(error.stack || error.message || error);
					});

				}
			]

		};

	});

	return COMPONENT_NAME;
});
