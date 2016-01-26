/* globals require, module, __dirname */

import hateoas from './hateoas/middleware.es6';

let express = require('express');
let fileStore = require('session-file-store');
let errorHandler = require('errorhandler');
let session = require('express-session');
let helmet = require('helmet');
let bodyParser = require('body-parser');
let paths = require('path');

import config from './config.es6';

let FileStore = fileStore(session);

let app = express();

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

export default app;
