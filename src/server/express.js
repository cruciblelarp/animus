/* globals require, module */

var express = require('express');
var parser_body = require('body-parser');

var config = require('./config');

var app = express();

app.use(express.static(config.path.base + '/static', {
	index: false
}));

app.get('/', function(req, res) {
	res.render('src/server/static/client.html');
});

app.use(parser_body.json());

module.exports = app;
