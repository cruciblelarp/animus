var http = require('http');
var socket = require('ws');
var swarm = require('swarm');
var express = require('express');
var express_static = require('serve-static');
var tamper = require('tamper');
var cheerio = require('cheerio');
var fs = require('fs');

// Create the swarm server
var fileStorage = new swarm.FileStorage('storage');
var swarmHost = new swarm.Host('swarm~nodejs', 0, fileStorage);

var app = express();

var dir_serve = __dirname + '/../../src/client';

function scrapeDeps(filePath, regex, callback) {
	var file = fs.readFileSync(dir_serve + '/' + filePath, 'utf-8');
	var dependencyArrayString = file.match(new RegExp(regex))[1];
	var deps = dependencyArrayString.match(new RegExp('[\'"].*?[\'"]', 'g'));
	for (var idx = 0; idx < deps.length; idx++) {
		callback(deps[idx].replace(new RegExp('[\'"]', 'g'), ''));
	}
}

app.use(tamper(function(req, res) {

	if (req.url !== '/client.html') {
		return;
	}

	return function (body) {
		var doc = cheerio.load(body);

		// Find the requirejs script
		var init = doc('script#init');

		var paths = {};
		var mainFileName = init.data('main');
		var mainFile = fs.readFileSync(dir_serve + '/' + mainFileName, 'utf-8');
		var pathArrayString = mainFile.match(new RegExp('paths *?: *?\\{([\\s\\S]*?)\\}'))[1];
		var pathEntryStrings = pathArrayString.match(new RegExp('\\S+ *?: *?\\S+', 'g'));
		for (var idx = 0; idx < pathEntryStrings.length; idx++) {
			var match = pathEntryStrings[idx].match(new RegExp('[\'"]?(\\S+?)[\'"]? *?: *?[\'"]?(\\S+\\w)[\'"]?'));
			if (match[1] && match[2]) {
				paths[match[1]] = match[2];
			}
		}

		var scripts = [];
		function processDependency(dependency) {
			var fileName = ( paths[dependency] || dependency ) + '.js';

			// Add the script to the page.
			init.append('<script src="' + fileName + '"/>');

			if (paths[dependency]) {
				return;
			}

			scrapeDeps(fileName, 'define\\(\\[([\\s\\S]*?)\\],', function(subdependency) {
				if (!subdependency.match(new RegExp('^\\w+!'))) {
					scripts.push(subdependency);
				}
			});

		}

		scrapeDeps(mainFileName, 'deps *?: *\\[([\\s\\S]*?)\\]', processDependency);

		while (scripts.length > 0) {
			processDependency(scripts.pop());
		}

		return doc.html();
	};

}));

app.use(express_static(dir_serve, {
	index: 'client.html',
	setHeaders: function (response, path, stat) {
		response.setHeader('Pragma', 'no-cache');
		response.setHeader('Cache-Control', 'no-cache');
	}
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

app.listen(8000);
