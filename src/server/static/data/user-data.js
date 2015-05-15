(function() {

	function configure(Swarm) {
		return Swarm.Model.extend('user', {
			defaults: {
				email: null,
				name: null,
				password_id: null,
				characters: [
				]
			}
		});
	}

	if (typeof(module) !== 'undefined') {
		var Swarm = require('swarm');
		module.exports = configure(Swarm);
	} else if(typeof(define) !== 'undefined') {
		define([ 'swarm-client' ], configure);
	}

})();
