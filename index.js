/* globals require, process, JSON, console */

process.nextTick(function() {
	console.log('process.env: ' + JSON.stringify(process.env, null));
	console.log('config: ' + JSON.stringify(require('./src/server/config'), null));
});

require('./src/server/server').start().then(function() {
	console.log("Server is up!");

}, function(error) {
	console.error(error.stack);
	process.exit(1);

});
