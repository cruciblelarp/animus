(function() {

	function configure(Swarm) {
		return Swarm.Model.extend('ability', {
			name: '',
			type: '',
			cost: 0,
			shadow: false,
			prerequisites: []
		});
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		module.exports = configure(Swarm);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client' ], configure);
	}

})();
