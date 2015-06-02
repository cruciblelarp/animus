/* globals require, module */

var swarm = require('swarm');

var socket = require('./socket');
var exit = require('./exit');
var config = require('./config');

var swarmHost = null;

module.exports = function() {

	if (swarmHost) {
		return swarmHost;
	}

	// Create the swarm server
	var fileStorage = new swarm.FileStorage('storage');
	swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

	// accept incoming WebSockets connections
	socket().on('connection', function (ws) {
		swarmHost.accept(new swarm.EinarosWSStream(ws), {
			delay: 50
		});
	});

};

exit.listen(function(resolve) {

	if (!swarmHost) {
		console.log('Swarm host not created.');
		return resolve(config.constant.EXIT_OK);
	}

	swarmHost.close(function (err) {
		return err
			? resolve(config.constant.EXIT_SWARM)
			: resolve(config.constant.EXIT_OK);
	});

});
