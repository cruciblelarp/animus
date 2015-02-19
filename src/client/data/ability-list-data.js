(function() {

	function configure(Swarm, Ability) {
		return Swarm.Set.extend('abilities', {
			objectType: Ability
		});
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		var Ability = require('./ability-data');
		module.exports = configure(Swarm, Ability);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client', 'data/ability-data' ], configure);
	}

})();
