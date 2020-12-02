// We grab Schema and model from mongoose library.
const { Schema, model } = require('mongoose');

// We declare new schema.
const guildCommandsShema = new Schema({
	gid: { type: String },
	command: { type: String },
	text: { type: String },
});

// We export it as a mongoose model.
module.exports = model('guild_commands', guildCommandsShema);