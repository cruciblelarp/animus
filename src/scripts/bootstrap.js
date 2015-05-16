'use strict';

/* globals require, module */

var gulp = require('gulp');
var through = require('through');
var mongo = require('../server/mongo');

module.exports = function() {

	return gulp.src()
		.pipe(through(function(file, done) {

			var conn = mongo();

			var ability = conn.then(function(conn) {
				return new Promise(function(resolve, reject) {
					conn['ability'].remove({}).then(function() {
						resolve(conn['ability']);
					}, reject);
				});
			});

			var ability_finesse_1 = ability.then(function(ability) {
				return ability.insert({
					"name": "Finesse 1",
					"cost": 0
				});
			});

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
			});

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
			});

			var ability_weaponry = ability.then(function(ability) {
				return ability.insert({
					"name": "Weaponry",
					"cost": 0,
					"degree": "novice",
					"description": "Use of any melee weapon. Each strike deals 1 point of damage."
				});
			});

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
			});

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
			});

			Promise.all([
				ability_small_weapons_expert
			]).then(function() {
				done();
			});

		}));

};
