// We grab Schema and model from mongoose library.
const { Schema, model } = require('mongoose');

// We declare new schema.
const csGuildSettingSchema = new Schema({
	gid: { type: String },
	prefix: { type: String, default: '?' },
	joinDate: { type: Date, default: new Date() },
	joinGroupID: { type: String, default: 'no' },
	tagPermissionGroups: { type: String, default: 'no' },
	systemChannel : { type: String, default: null },
	joinRoles : { type: String, default: null },
});

// We export it as a mongoose model.
module.exports = model('cs_guild_settings', csGuildSettingSchema);