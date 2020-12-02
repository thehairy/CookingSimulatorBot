/* eslint-disable no-case-declarations */
module.exports = {
	name: 'settings',
	description: 'Configuration of the bot',
	usage: '`settings tagRoles/logChannel [@Roles|@Channel]`',
	async execute(client, message, args) {
		if (message.author.id !== '211888560662511617') {
			if (!message.member.permissions.has('ADMINISTRATOR')) return;
		}
		if (args.length < 1) return;
		switch (args[0]) {
		case 'tag':
			const taggedRoles = message.mentions.roles.map(role => role.id);
			message.storedSettings.tagPermissionGroups = taggedRoles.join(',');
			await message.storedSettings.save().catch(() => {});
			if (message.storedSettings) message.reply(`${taggedRoles.length} got added.`);
			return;
		case 'log':
			const taggedChannel = message.mentions.channels.first();
			if (!taggedChannel || taggedChannel.type != 'text') {
				message.storedSettings.systemChannel = null;
				await message.storedSettings.save().catch(() => {});
				return message.reply(`the logging channel is now ${message.guild.channels.cache.get(message.storedSettings.systemChannel) || message.guild.systemChannel.name}.`);
			}
			message.storedSettings.systemChannel = taggedChannel.id;
			await message.storedSettings.save().catch(() => {});
			if (message.storedSettings) message.reply(`the logging channel is now ${taggedChannel.name}.`);
			return;
		}
	},
};