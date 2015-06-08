/* globals require, process */

var config = require('./config');
var app = require('./express');

require('./login-endpoint');

app.listen(config.port, function() {
	console.log('Starting application on port ' + config.port);
});
