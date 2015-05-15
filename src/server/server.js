/* globals require, process */

var config = require('./config');

var http = require('http');
var socket = require('ws');
var swarm = require('swarm');
var express = require('express');
var assert = require('assert');
var parser_body = require('body-parser');
var mongo = require('./mongo');

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

var User = require('./static/data/user-data.js');

function doHash(key) {
	return key;
}

app.post('/login', function(req, res) {

	assert(req.is('json'));
	var email = req.body.email;
	var password = req.body.password;

	// validate request
	assert(email != null);
	assert(password != null);

	var user = null;
	var token = null;

	mongo.get('user', {
		email: email
	}).then(function(user_record) {

		user  = user_record;
		return mongo.get('password', {
			_id: user.password._id
		});

	}).then(function(password_record) {

		// run crypto hash on supplied password.
		var hash = doHash(password);
		if (hash !== password_record.hash) {
			res.send(400, {});
		}

		new User(user._id, user);

		token = doHash(user.email + hash + req['ip']);

		res.send({
			id: user._id,
			token: token
		});

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

app.listen(config.port, function() {
	console.log('Starting application on port ' + config.port);
});
