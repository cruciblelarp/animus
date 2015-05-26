/* globals require, module */

var assert = require('assert');
var crypto = require('crypto/md5');
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

	mongo().then(function(db) {

		conn = db;

		return conn.collection('users').findOne({
			email: email
		}).done();

	}).then(function(user_record) {

		if (!user_record) {
			throw 404;
		}

		user  = user_record;
		return conn.collection('password').findOne({
			_id: user.password
		}).done();

	}).then(function(password_record) {

		if (!password_record) {
			throw 404;
		}

		// run crypto hash on supplied password.
		var hash = crypto.hex_md5(password);
		if (hash !== password_record.hash) {
			throw 400;
		}

		new User(user._id, swarm(), user);

		token = crypto.md5(user.email + hash + req['ip']);

		res.status(200).send({
			id: user._id,
			token: token
		});

	}).catch(function(error) {

		if (_.isNumber(error)) {
			return res.status(error);
		}

		return res.status(500).send(error);

	}).done();

});
