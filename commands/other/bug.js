module.exports = {
	name: 'bug',
	description: 'Report a bug regarding the bot',
	usage: '`bug <description>`',
	execute: (client, message, args) => {
		if (!args || args.length <= 0) return message.reply('please provide a description of the bug.');
		client.users.cache.get('211888560662511617').send(`Bug Report from ${message.author.tag}: \`${args.join(' ')}\``);
	},
};