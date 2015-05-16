/* globals require, module */

var assert = require('assert');
var crypto = require('crypto');

var mongo = require('./mongo');
var app = require('./express');
var User = require('./static/data/user-data.js');
var swarm = require('./swarm');

app.post('/login', function(req, res) {

	assert(req.is('json'));
	var email = req.body.email;
	var password = req.body.password;

	// validate request
	assert(email != null);
	assert(password != null);

	var user = null;
	var token = null;

	mongo.get('user', {
		email: email
	}).then(function(user_record) {

		user  = user_record;
		return mongo.get('password', {
			_id: user.password._id
		});

	}).then(function(password_record) {

		// run crypto hash on supplied password.
		var hash = crypto.md5(password);
		if (hash !== password_record.hash) {
			res.status(400);
		}

		new User(user._id, swarm(), user);

		token = crypto.md5(user.email + hash + req['ip']);

		res.send({
			id: user._id,
			token: token
		});

	}).catch(function(error) {
		res.status(500).send(error);
	});

});
