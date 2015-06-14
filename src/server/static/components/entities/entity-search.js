define([

	'angular',

	'angular-module'

], function(ng, _animus) {
	var COMPONENT_NAME = '$search';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope', _util,
		function ($root, $util) {

			var index = lunr(function () {
				this.field('title', { boost: 10 });
				this.field('description');
				this.ref('id');
			});

			// Re-index on entity changes.
			$root.$watchCollection('entities', function(newVal, oldVal) {

				// Remove all the old indexed entities.
				_.each(oldVal, function(entity) {
					// TODO: Add hash check against other collection.
					index.remove(entity);
				});

				// Add values from new list.
				_.each(newVal, function(entity) {
					index.add({
						id: entity.id,
						title: entity.title,
						description: entity.description
					});
				});

			});

			return index.search;

		}
	]);

	return COMPONENT_NAME;
});
