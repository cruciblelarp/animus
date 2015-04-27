'use strict';

/* globals require, env, __dirname */

var http = require('http');
var socket = require('ws');
var swarm = require('swarm');
var express = require('express');
var express_static = require('serve-static');

// Create the swarm server
var fileStorage = new swarm.FileStorage('storage');
var swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

var app = express();

app.use(express_static(__dirname + '/static', {
	index: 'client.html'/*,
	setHeaders: function (response, path, stat) {
		response.setHeader('Pragma', 'no-cache');
		response.setHeader('Cache-Control', 'no-cache');
	}*/
}));

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

//require('./static/user-data.js');

app.listen(env['$PORT'] | 8000);
