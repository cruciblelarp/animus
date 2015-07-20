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
		function($root, $util) {

			$root.$watch('session.selected.character', function(characterId) {

				if (!characterId) {

					// Grab the first character in the character list if possible.
					var first = _.first($util.$get($root.session, 'collection.characters'));
					if (first && first.id) {
						$util.$set($root.session, 'selected.character', first);
						return; // will trigger the watch expression again.
					}

				}

				// Start requesting the character detail.
				var loading = $http.get('/api/admin/characters/' + characterId).then(function(response) {
					$util.$set($root.session, 'entity[' + response.data.id + ']', response.data);

				}, function(error) {
					console.error(error.stack);
				});

				// Make sure that the loading object exists.
				if (!$scope.$root.loading) {
					$scope.$root.loading = {};
				}

				// Save the loading promise globally.
				$scope.$root.loading['api/admin/characters/:id'] = loading;

			});

		}
	]);

	return COMPONENT_NAME;
});
