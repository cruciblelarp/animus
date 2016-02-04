/* globals module, require */

let sockit = require('sockit-express');

import app from './express.js';
import http from './http.js';

export default sockit({
	express: app,
	server: http
});
