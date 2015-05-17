'use strict';

/* globals require, module */

var gulp = require('gulp');
var Promise = require('promise');

var mongo = require('../server/mongo');

module.exports = function(done) {
	return new Promise(function(resolve, reject) {

		var conn = mongo();

		var ability = conn.then(function(conn) {
			return new Promise(function(resolve) {
				conn['ability'].remove({}).then(function() {
					resolve(conn['ability']);
				}, reject);
			});
		}, reject);

		var ability_finesse_1 = ability.then(function(ability) {
			return ability.insert({
				"name": "Finesse 1",
				"cost": 0
			});
		}, reject);

		var ability_finesse_2 = Promise.all([
			ability,
			ability_finesse_1
		]).then(function(results) {
			return results[0].insert({
				"name": "Finesse 2",
				"cost": 5,
				"prerequisites": [
					{ _id: results[1]._id }
				]
			});
		}, reject);

		var ability_finesse_3 = Promise.all([
			ability,
			ability_finesse_2
		]).then(function(results) {
			return results[0].insert({
				"name": "Finesse 3",
				"cost": 5,
				"prerequisites": [
					{ _id: results[1]._id }
				]
			});
		}, reject);

		var ability_weaponry = ability.then(function(ability) {
			return ability.insert({
				"name": "Weaponry",
				"cost": 0,
				"degree": "novice",
				"description": "Use of any melee weapon. Each strike deals 1 point of damage."
			});
		}, reject);

		var ability_small_weapons_adept = Promise.all([
			ability,
			ability_weaponry,
			ability_finesse_2
		]).then(function(results) {
			return results[0].insert({
				"name": "Small Weapons, Adept",
				"cost": 3,
				"degree": "adept",
				"prerequisites": _.collect(results.slice(1), function (item) {
					return {_id: item._id};
				}),
				"description": "Adept with Small Weapons (<50cm). BLEED 1/Encounter. This ability counts as a Weapon Skill",
				"tags": [
					"weapon"
				]
			});
		}, reject);

		var ability_small_weapons_expert = Promise.all([
			ability,
			ability_small_weapons_adept,
			ability_finesse_3
		]).then(function(results) {
			return results[0].insert({
				"name": "Small Weapons, Expert",
				"cost": 3,
				"degree": "expert",
				"prerequisites": _.collect(results.slice(1), function(item) {
					return { _id: item._id };
				}),
				"description": "Expert with Small Weapons (<50cm). SLOW 1/Encounter. This ability counts as a Weapon Skill.",
				"tags": [
					"weapon"
				]
			});
		}, reject);

		var character = conn.then(function(conn) {
			return new Promise(function(resolve) {
				return conn['character'].remove({}).then(function() {
					resolve(conn['character']);
				}, reject);
			});
		}, reject);

		var character_brian_winterdale = Promise.all([
			character,
			ability_finesse_1,
			ability_weaponry
		]).then(function(results) {
			return results[0].insert({
				"name": "Brian Winterdale",
				"abilities": _.collect(results.slice(1), function(ability) {
					return { _id: ability._id };
				})
			});
		}, reject);

		var character_eric_flabberghast = Promise.all([
			character,
			ability_finesse_1,
			ability_finesse_2,
			ability_weaponry,
			ability_small_weapons_adept,
			ability_small_weapons_expert
		]).then(function(results) {
			return results[0].insert({
				"name": "Eric Flabberghast",
				"abilities": _.collect(results.slice(1), function(ability) {
					return { _id: ability._id };
				})
			});
		}, reject);

		var character_romina_thrilling = Promise.all([
			character,
			ability_finesse_1,
			ability_weaponry
		]).then(function(results) {
			return results[0].insert({
				"name": "Romina Thrilling",
				"abilities": _.collect(results.slice(1), function(ability) {
					return { _id: ability._id };
				})
			});
		}, reject);

		var user = conn.then(function(conn) {
			return new Promise(function(resolve) {
				conn['user'].remove({}).then(function() {
					resolve(conn['user']);
				}, reject);
			});
		}, reject);

		var user_somewhere = Promise.all([
			user,
			character_brian_winterdale,
			character_eric_flabberghast
		]).then(function(results) {
			return results[0].insert({
				"email": "email@somewhere.com",
				"name": "test user",
				"characters": _.collect(results.slice(1), function(character) {
					return { _id: character._id };
				})
			});
		}, reject);

		var user_elsewhere = Promise.all([
			user,
			character_romina_thrilling
		]).then(function(results) {
			return results[0].insert({
				"email": "email@elsewhere.com",
				"name": "other test user",
				"characters": _.collect(results.slice(1), function(character) {
					return { _id: character._id };
				})
			});
		}, reject);

		return Promise.all([
			user_somewhere,
			user_elsewhere
		]).then(resolve, reject);

	}).catch(done);
};
