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
				componentCharacterDetail: '='
			},

			controller: [
				'$scope', _util,
				function($scope, $util) {

					$scope.loading = $scope.$root.loading['/api/admin/characters/:id'];

					var entityId = $util.$get($scope.$root.session, 'selected.character');
					$scope.target = entityId && $scope.$root.session['entity[' + entityId + ']'];

				}
			]

		};

	});

	ng.module(_animus).run([
		'$rootScope', _util, '$http',
		function($root, $util, $http) {

			$root.$watch('session.selected.character', function(characterId) {

				if (!characterId) {

					// Grab the first character in the character list if possible.
					var first = _.first($util.$get($root.session, 'collection.characters'));
					if (!first || !first.id) {
						// nothing special here.
						return;
					}

					// set the selected character, which will trigger the watch expression again.
					$util.$set($root.session, 'selected.character', first);
					return;

				}

				var character = $util.$get($root.session, 'entity[' + characterId + ']');
				if (character) {
					// character already retrieved
					return $util.resolve(character);
				}

				// Start requesting the character detail.
				var loading = $http.get('/api/admin/characters/' + characterId).then(function(response) {
					$util.$set($root.session, 'entity[/api/admin/characters/' + response.data.id + ']', response.data);
					return $util.resolve(response.data);

				}, function(error) {
					console.error(error.stack);
				});

				// Make sure that the loading object exists.
				if (!$root.loading) {
					$root.loading = {};
				}

				// Save the loading promise globally.
				$root.loading['api/admin/characters/:id'] = loading;

			});

		}
	]);

	return COMPONENT_NAME;
});
