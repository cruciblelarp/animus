/* globals require, module, __dirname */

var express = require('express');
var fileStore = require('session-file-store');
var errorHandler = require('errorhandler');
var session = require('express-session');

var config = require('./config');

var FileStore = fileStore(session);

var app = express();

app.use(errorHandler());

app.use(session({
	secret: config.session.secret,
	saveUninitialized: true,
	resave: false,
	cookie: {
		path: '/',
		httpOnly: false,
		secure: false,
		maxAge: 3600000
	},
	store: new FileStore({
		reapAsync: false
	})
}));

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
