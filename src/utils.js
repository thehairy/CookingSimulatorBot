const { Role } = require('discord.js');

module.exports = {
	checkPermission(member, permission) {
		return member.permissions.has(permission) || false;
	},
	higherRole(shouldBeHigher, shouldBeLower) {
		return Role.comparePositions(shouldBeHigher, shouldBeLower) > 0 ? true : false;
	},
	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	},
	clean(text) {
		if (typeof (text) === 'string') {
			return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
		} else {
			return text;
		}
	}
}