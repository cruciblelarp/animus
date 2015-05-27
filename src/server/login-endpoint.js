/* globals require, module */

var _ = require('underscore');
var assert = require('assert');
var crypto = require('crypto');
var Promise = require('promise');

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
	var conn = null;

	return mongo().then(function(db) {

		conn = db;

		return conn.collection('users');

	}).then(function(users) {

		return users.findOne({
			email: email
		});

	}).then(function(user_record) {

		if (!user_record) {
			throw 404;
		}

		user  = user_record;

		return conn.collection('passwords');

	}).then(function(passwords) {

		return passwords.findOne({
			_id: user.password
		});

	}).then(function(password_record) {

		if (!password_record) {
			throw 404;
		}

		// run crypto hash on supplied password.
		var hash = crypto.createHash('md5')
			.update(password)
			.digest('hex');
		if (hash !== password_record.hash) {
			throw 400;
		}

		var userId = user._id.toString();

		//var swarm_user = new User(userId, swarm(), user);
		//swarm_user.on('.init', function() {
		//	swarm_user.set(user);
		//});

		token = crypto.createHash('md5')
			.update(user.email + hash + req['ip'])
			.digest('hex');

		res.status(200).send({
			id: userId,
			token: token
		});

	}).catch(function(error) {

		if (error && _.isNumber(error)) {
			res.status(error);
			return;
		}

		console.log(error.message);
		res.status(500).send(error.message);

	}).done(function() {
		console.log('Login request complete.');
	}, function(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	});

});
