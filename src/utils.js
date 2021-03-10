const { Role } = require('discord.js');

module.exports = {
	checkPermission(member, permission) {
		return member.permissions.has(permission) || false;
	},
	async activateLoading(client, interaction) {
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 5
			}
		})
	},
	async sendHiddenMessage(client, interaction, message) {
		if (!message) return console.log('No message was provided!');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 3,
				data: {
					content: message,
					flags: 64
				}
			}
		});
	},
	async sendHiddenMessageAck(client, interaction, message) {
		if (!message) return console.log('No message was provided!');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: message,
					flags: 64
				}
			}
		});
	},
	higherRole(shouldBeHigher, shouldBeLower) {
		return Role.comparePositions(shouldBeHigher, shouldBeLower) > 0 ? true : false;
	},
	getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
}