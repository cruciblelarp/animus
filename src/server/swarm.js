/* globals require, module */

var http = require('http');
var socket = require('ws');
var swarm = require('swarm');

var app = require('./express');

// Create the swarm server
var fileStorage = new swarm.FileStorage('storage');
var swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

// create and start the HTTP server with static file serving.
var httpServer = http.createServer(app);

// start WebSocket server
var wsServer = new socket.Server({
	server: httpServer
});

// accept incoming WebSockets connections
wsServer.on('connection', function (ws) {
	swarmHost.accept(new swarm.EinarosWSStream(ws), {
		delay: 50
	});
});

module.exports = swarmHost;
