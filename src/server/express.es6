/* globals require, module, __dirname */

var express = require('express');
var fileStore = require('session-file-store');
var errorHandler = require('errorhandler');
var session = require('express-session');
var helmet = require('helmet');
var bodyParser = require('body-parser');

import config from './config.es6';

var FileStore = fileStore(session);

var app = express();

app.use(errorHandler());
app.use(bodyParser());
app.use(helmet());

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

app.get('/', function(req, res) {
	req.session.touch();
	res.render('main', {
		dev: req.query['dev']
			? req.query['dev'] === 'true'
			: config.debug
	});
});

export default app;
