define([

	'angular',
	'lunr',

	'angular-module'

], function(ng, lunr, _animus) {
	var COMPONENT_NAME = '$search';

	ng.module(_animus).service(COMPONENT_NAME, [
		'$rootScope',
		function ($root) {

			var index = lunr(function () {
				this.ref('id');
				this.field('name', { boost: 10 });
				this.field('description');
				this.field('labels');
			});

			// Re-index on entity changes.
			$root.$watchCollection('session.entities', function(newVal, oldVal) {

				// Remove all the old indexed entities.
				_.each(oldVal, function(entity) {
					// TODO: Add hash check against other collection.
					index.remove(entity);
				});

				// Add values from new list.
				_.each(newVal, function(entity) {
					index.add(entity);
				});

			});

			return _.bind(index.search, index);

		}
	]);

	return COMPONENT_NAME;
});
