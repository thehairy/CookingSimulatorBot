module.exports = {
	name: 'prefix',
	description: 'Changes the prefix',
	usage: '`prefix (newPrefix)`',
	async execute(client, message, args) {
		if (!message.member.permissions.has('ADMINISTRATOR')) return;
		if (args.length < 1 || args[0].length < 1) {
			const messageAsk = await message.reply('please enter the new prefix:');
			const filter = (msg => msg.author.id == message.author.id);
			messageAsk.channel.awaitMessages(filter, {
				max: 1,
				time: 10000,
				errors: ['time'],
			}).then(async collected => {
				message.storedSettings.prefix = collected.first().content.trim();
				await message.storedSettings.save().catch(() => {});
				message.reply(`you changed the prefix to: ${message.storedSettings.prefix}`);
			}).catch(() => {
				messageAsk.delete();
				message.delete();
			});
		} else {
			message.storedSettings.prefix = args[0];
			await message.storedSettings.save().catch(() => {});
			message.reply(`you changed the prefix to: ${message.storedSettings.prefix}`);
		}
	},
};