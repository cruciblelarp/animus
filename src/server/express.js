/* globals require, module, __dirname */

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
		reapAsync: false
	}),
	cookie: {
		path: '/',
		httpOnly: false,
		secure: false,
		maxAge: 3600000
	}
});

app.use(app.session);

app.use(express.static(config.path.base + '/static', {
	index: false
}));

app.set('view engine', 'jade');
app.set('views', __dirname);

app.get('/', function(req, res) {
	req.session.touch();
	res.render('main', {
		dev: !!req.query['dev']
	});
});

module.exports = app;
