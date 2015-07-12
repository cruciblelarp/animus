define([
], function() {

	return {

		KEY_LOGIN: 'loginId',

		/**
		 * Generates a storage key for a given entity id.
		 * @param entityId The id of the desired entity.
		 * @returns {string} The storage key for the entity.
		 */
		TPL_KEY_ENTITY: function(entityId) {
			return 'entity[' + entityId + ']';
		}

	};

});
