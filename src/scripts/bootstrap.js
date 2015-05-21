/* globals require, module */

var _ = require('underscore');
var gulp = require('gulp');
var Promise = require('promise');
var util = require('util');

var mongo = require('../server/mongo');

module.exports = function() {

	function insert(collection, data) {
		return new Promise(function(resolve, reject) {
			collection.insert(data, function(err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	}

	function resolve(config) {
		var promises = _.values(config);
		return Promise.all(promises).then(function(results) {
			var context = {};

			var names = _.keys(config);
			_.each(names, function(name, index) {
				context[name] = results[index];
			});

			return Promise.resolve(context);
		});
	}

	var conn = mongo().then(function(conn) {
		util.log('Connection established.');
		return conn;
	});

	function initCollection(name, options) {
		return conn.then(function(conn) {

			util.log('Attempting to retrieve the ' + name + ' collection.');
			var collection = conn.collection(name);

			if (!collection) {
				util.log('Creating ' + name + ' collection.');
				return conn.createCollection(name, options).then(function(collection) {
					util.log('Finished creating ' + name + ' collection.');
					return Promise.resolve(collection);
				});
			}

			return collection.drop().then(function() {
				util.log('Dropped ' + name + ' and recreating.');
				return conn.createCollection(name, {});
			}).then(function(collection) {
				util.log('Finished re-creating ' + name + ' collection.');
				return Promise.resolve(collection);
			});

		});
	}

	var ability = initCollection('ability', {});

	var ability_finesse_1 = resolve({
		collection: ability
	}).then(function(results) {
		util.log('Creating finesse 1');
		return insert(results.collection, {
			"name": "Finesse 1",
			"cost": 0
		}).then(function(finesse_1) {
			util.log('Finished creating finesse 2: ' + finesse_1._id);
			return Promise.resolve(finesse_1);
		});
	});

	var ability_finesse_2 = resolve({
		collection: ability,
		finesse_1: ability_finesse_1
	}).then(function(results) {
		util.log('inserting finesse 2');
		return insert(results.collection, {
			"name": "Finesse 2",
			"cost": 5,
			"prerequisites": [
				{ _id: results.finesse_1._id }
			]
		}).then(function(finesse_2) {
			util.log('finished inserting finesse 2:' + finesse_2._id);
			return finesse_2;
		});
	});

	var ability_finesse_3 = resolve({
		collection: ability,
		finesse_2: ability_finesse_2
	}).then(function(results) {
		util.log('Creating finesse 3');
		return insert(results.collection, {
			"name": "Finesse 3",
			"cost": 5,
			"prerequisites": [
				{ _id: results.finesse_2._id }
			]
		}).then(function(finesse_3) {
			util.log('Finished creating finesse 3: ' + finesse_3._id);
			return Promise.resolve(finesse_3);
		});
	});

	var ability_weaponry = resolve({
		collection: ability
	}).then(function(results) {
		util.log('Creating weaponry');
		return insert(results.collection, {
			"name": "Weaponry",
			"cost": 0,
			"degree": "novice",
			"description": "Use of any melee weapon. Each strike deals 1 point of damage."
		}).then(function(weaponry) {
			return Promise.resolve(weaponry);
		});
	});

	var ability_small_weapons_adept = resolve({
		collection: ability,
		weaponry: ability_weaponry,
		finesse_2: ability_finesse_2
	}).then(function(results) {
		util.log('Creating small weapons adept');
		return insert(results.collection, {
			"name": "Small Weapons, Adept",
			"cost": 3,
			"degree": "adept",
			"prerequisites": [
				{ _id: results.weaponry._id },
				{ _id: results.finesse_2._id }
			],
			"description": "Adept with Small Weapons (<50cm). BLEED 1/Encounter. This ability counts as a Weapon Skill",
			"tags": [
				"weapon"
			]
		}).then(function(small_weapons_adept) {
			util.log('Finished creating small weapons adept: ' + small_weapons_adept._id);
			return Promise.resolve(small_weapons_adept);
		});
	});

	var ability_small_weapons_expert = resolve({
		collection: ability,
		small_weapons_adept: ability_small_weapons_adept,
		finesse_3: ability_finesse_3
	}).then(function(results) {
		util.log('Creating small weapons expert');
		return insert(results.collection, {
			"name": "Small Weapons, Expert",
			"cost": 3,
			"degree": "expert",
			"prerequisites": [
				{ _id: results.small_weapons_adept._id },
				{ _id: results.finesse_3._id }
			],
			"description": "Expert with Small Weapons (<50cm). SLOW 1/Encounter. This ability counts as a Weapon Skill.",
			"tags": [
				"weapon"
			]
		}).then(function(small_weapons_expert) {
			util.log('Finished creating small weapons expert: ' + small_weapons_expert._id);
			return Promise.resolve(small_weapons_expert);
		});
	});

	var character = initCollection('character', {});

	var character_brian_winterdale = resolve({
		collection: character,
		finesse_1: ability_finesse_1,
		weaponry: ability_weaponry
	}).then(function(results) {
		util.log('Creating Brian Winterdale');
		return insert(results.collection, {
			"name": "Brian Winterdale",
			"abilities": [
				{ _id: results.finesse_1._id },
				{ _id: results.weaponry._id }
			]
		}).then(function(brian_winterdale) {
			util.log('Created brian winterdale: ' + brian_winterdale._id);
			return Promise.resolve(brian_winterdale);
		});
	});

	var character_eric_flabberghast = resolve({
		collection: character,
		finesse_1: ability_finesse_1,
		finesse_2: ability_finesse_2,
		weaponry: ability_weaponry,
		small_weapons_adept: ability_small_weapons_adept,
		small_weapons_expert: ability_small_weapons_expert
	}).then(function(results) {
		util.log('Creating Eric Flabberghast');
		return insert(results.collection, {
			"name": "Eric Flabberghast",
			"abilities": [
				{ _id: results.finesse_1._id },
				{ _id: results.finesse_2._id },
				{ _id: results.weaponry._id },
				{ _id: results.small_weapons_adept._id },
				{ _id: results.small_weapons_expert._id }
			]
		}).then(function(eric_flabberghast) {
			util.log('Finished creating Eric Flabberghast: ' + eric_flabberghast._id);
			return Promise.resolve(eric_flabberghast);
		});
	});

	var character_romina_thrilling = resolve({
		collection: character,
		finesse_1: ability_finesse_1,
		weaponry: ability_weaponry
	}).then(function(results) {
		util.log('Creating Romina Thrilling');
		return insert(results.collection, {
			"name": "Romina Thrilling",
			"abilities": [
				{ _id: results.finesse_1._id },
				{ _id: results.weaponry._id }
			]
		}).then(function(romina_thrilling) {
			util.log('Finished creating Romina Thrilling: ' + romina_thrilling._id);
			return Promise.resolve(romina_thrilling);
		});
	});

	var user = initCollection('user', {});

	var user_somewhere = resolve({
		collection: user,
		brian_winterdale: character_brian_winterdale,
		eric_flabberghast: character_eric_flabberghast
	}).then(function(results) {
		util.log('Creating somewhere.');
		return insert(results.collection, {
			"email": "email@somewhere.com",
			"name": "test user",
			"characters": [
				{ _id: results.brian_winterdale._id },
				{ _id: results.eric_flabberghast._id }
			]
		}).then(function(somewhere) {
			util.log('Finished creating somewhere: ' + somewhere._id);
			return Promise.resolve(somewhere);
		});
	});

	var user_elsewhere = resolve({
		collection: user,
		romina_thrilling: character_romina_thrilling
	}).then(function(results) {
		util.log('Creating elsewhere.');
		return insert(results.collection, {
			"email": "email@elsewhere.com",
			"name": "other test user",
			"characters": [
				{ _id: results.romina_thrilling._id }
			]
		}).then(function(elsewhere) {
			util.log('Finished creating elsewhere: ' + elsewhere._id);
			return Promise.resolve(elsewhere);
		});
	});

	return Promise.all([
		user_somewhere,
		user_elsewhere
	]);

};
