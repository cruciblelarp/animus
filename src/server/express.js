/* globals require, module */

var express = require('express');
var Session = require('express-session');
var fileStore = require('session-file-store');
var errorHandler = require('errorhandler');

var config = require('./config');

var SessionStore = fileStore(Session);

var app = express();

app.use(errorHandler());

app.session = new Session({
	resave: false,
	secret: config.session.secret,
	saveUninitialized: false,
	store: new SessionStore({
		reapAsync: true,
		reapSyncFallback: true
	})
});

app.use(app.session);

app.use(express.static(config.path.base + '/static', {
	index: false
}));

app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('main', { debug: !!req.param['debug'] });
});

module.exports = app;
