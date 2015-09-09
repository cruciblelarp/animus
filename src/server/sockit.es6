/* globals module, require */

let sockit = require('sockit-express');

import app from './express.es6';
import http from './http.es6';

export default sockit({
	express: app,
	server: http
});
