
var http = require('http');
var socket = require('ws');
var swarm = require('swarm');
var static = require('node-static');

// Create the swarm server
var fileStorage = new swarm.FileStorage('storage');
var swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

var fileServer = new static.Server('src/client');

// create and start the HTTP server with static file serving.
var httpServer = http.createServer(function(request, response) {
	request.addListener('end', function () {
	    fileServer.serve(request, response, function (err, result) {
	        if (err) {
				
				// There was an error serving the file
	            sys.error("Error serving " + request.url + " - " + err.message);

	            // Respond to the client
	            response.writeHead(err.status, err.headers);
	            response.end();

	        }
	    });
	}).resume();
});

httpServer.listen(8000, function (err) {

	if (err) 
		console.warn('Can\'t start server. Error: ', err, err.stack);
		return;
	}

	console.log('swarm server started at port 8000');

});

// start WebSocket server
var wsServer = new socket.Server({
	server: httpServer
});

// accept incoming WebSockets connections
wsServer.on('connection', function (ws) {
	console.log('new incoming WebSocket connection');
	swarmHost.accept(new swarm.EinarosWSStream(ws), {
	   delay: 50
	});
});

