(function() {

	function configure(Swarm) {
		return Swarm.Model.extend('user', {
		});
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		module.exports = configure(Swarm);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client' ], configure);
	}

})();