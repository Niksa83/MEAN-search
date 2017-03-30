'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

	let HeroSchema = new Schema({
		nick : { type: String, required: true},
		name: { type: String, required: true }
	});

module.exports = mongoose.model('Hero', HeroSchema);