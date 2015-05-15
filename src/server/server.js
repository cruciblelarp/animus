/* globals require, process */

var config = require('./config');

var http = require('http');
var socket = require('ws');
var swarm = require('swarm');
var express = require('express');
var assert = require('assert');
var parser_body = require('body-parser');

// Create the swarm server
var fileStorage = new swarm.FileStorage('storage');
var swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

var config = {
	port: process.env['PORT'] || 8000,
	mongo: {
		uri: process.env['MONGOLAB_URI'] || 'mongodb://localhost:4000'
	}
};

var app = express();

app.use(express.static(__dirname + '/static', {
	index: false
}));

app.get('/', function(req, res) {
	res.render('src/server/static/client.html');
});

app.use(parser_body.json());

app.post('/login', function(req, res) {

	// validate request
	assert(req.is('json'));
	assert(req.body.email != null);
	assert(req.body.password != null);

	// retrieve / generate token
	var token = req.ip;

	// return response with token.
	res.send({
		token: token
	});

});

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

app.listen(config.port, function() {
	console.log('Starting application on port ' + config.port);
});
