(function() {

	/**
	 * Defines a set of abilities represented by the following structure:
	 * <code>
	 *     {
	 *         name: '',
	 *         type: '',
	 *         cost: 0,
	 *         shadow: false,
	 *         prerequisites: []
	 *     }
	 * </code>
	 */
	function configure(Swarm) {
		return Swarm.Set.extend('ability');
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		module.exports = configure(Swarm);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client' ], configure);
	}

})();
