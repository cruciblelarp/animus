/* globals require, module, __dirname */

import express from 'express';
import fileStore from 'session-file-store';
import errorHandler from 'errorhandler';
import session from 'express-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import paths from 'path';

import config from './config';

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
