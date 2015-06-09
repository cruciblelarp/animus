/* globals require, process */

var config = require('./config');
var http = require('./http');

require('./login-endpoint');

http.listen(config.port, function() {
	console.log('Starting application on port ' + config.port);
}).on('error', function(error) {
	console.error(error.stack);
});
