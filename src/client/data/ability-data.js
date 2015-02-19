(function() {

	/**
	 * Defines an ability with the following structure:
	 * <code>
	 *     {
	 *         name: '',
	 *         degree: '', {optional}
	 *         cost: 0,
	 *         prerequisites: [] {optional}
	 *         tags: [] {optional}
	 *     }
	 * </code>
	 */
	function configure(Swarm) {
		return Swarm.Model.extend('ability');
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		module.exports = configure(Swarm);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client' ], configure);
	}

})();
