// We grab Schema and model from mongoose library.
const { Schema, model } = require('mongoose');

// We declare new schema.
const csGuildCommandsShema = new Schema({
	gid: { type: String },
	command: { type: String },
	text: { type: String },
});

// We export it as a mongoose model.
module.exports = model('cs_guild_commands', csGuildCommandsShema);