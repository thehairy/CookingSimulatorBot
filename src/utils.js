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
		});
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
	async sendMessage(client, interaction, message) {
		if (!message) return console.log('No message was provided!');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: message
				}
			}
		})

	},
	async sendMessageAfterLoading(client, interaction, message) {
		if (!message) return console.log('No message was provided!');
		await client.api.webhooks(client.user.id, interaction.token).post({
			data: {
				content: message
			}
		});
	},
	async sendEmbed(client, interaction, embed) {
		if (!embed) return console.log('No embed was provided!');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [ embed ]
				}
			}
		})
	},
	async sendEmbeds(client, interaction, embeds) {
		if (embeds.length <= 0) return console.log('No embeds was provided!');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: embeds
				}
			}
		})
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