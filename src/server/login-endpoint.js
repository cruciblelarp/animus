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

	return mongo().then(function(db) {

		conn = db;

		return new Promise(function(resolve, reject) {
			conn.collection('users').findOne({
				email: email
			}, function(err, item) {
				err ? reject(err) : resolve(item);
			});
		});

	}).then(function(user_record) {

		if (!user_record) {
			throw 404;
		}

		user  = user_record;
		return new Promise(function(resolve, reject) {
			conn.collection('passwords').findOne({
				_id: user.password
			}, function(err, item) {
				err ? reject(err) : resolve(item);
			});
		});

	}).then(function(password_record) {

		if (!password_record) {
			throw 404;
		}

		// run crypto hash on supplied password.
		var hash = crypto.hex_md5(password);
		if (hash !== password_record.hash) {
			throw 400;
		}

		var userId = user._id.toString();

		var swarm_user = new User(userId, swarm());
		swarm_user.on('.init', function() {
			swarm_user.set(user);
		});

		token = crypto.hex_md5(user.email + hash + req['ip']);

		res.status(200).send({
			id: userId,
			token: token
		});

	}).catch(function(error) {

		if (_.isNumber(error)) {
			res.status(error);
			return;
		}

		res.status(500).send(error);

	}).done();

});
