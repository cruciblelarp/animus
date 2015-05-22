/* globals require, module, __dirname */

module.exports = {

	path: {
		base: __dirname
	},

	port: process.env['PORT'] || 8000,
	mongo: {
		uri: process.env['MONGOLAB_URI'] || 'mongodb://localhost:4000'
	}

};
