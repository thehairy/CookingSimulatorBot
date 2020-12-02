const {
	MessageEmbed,
} = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all commands',
	usage: '`help`',
	execute(client, message, args) {
		const embed = new MessageEmbed();
		if (args.length > 0) {
			let commandHelp;
			embed.setThumbnail(client.user.displayAvatarURL());
			try {
				Object.keys(client.commands).forEach((key) => {
					if (client.commands[key].has(args[0])) {
						commandHelp = client.commands[key].get(args[0]);
						throw 'wanted';
					}
				});
			} catch (err) {
				// hehe
			}
			if (!commandHelp) return message.reply('command not found!');
			embed.addField('Command', '`' + commandHelp.name + '`');
			embed.addField('Description', commandHelp.description);
			embed.addField('Usage', commandHelp.usage);
		} else {
			const techQuoteOfTheWeek = require('tech-quote-of-the-week').default;
			const techQoute = techQuoteOfTheWeek()();
			embed.setColor('#ffff00');
			embed.setTitle('All Commands');
			embed.setDescription(`To get a description for a command, use \`${message.storedSettings.prefix}help <command>\``);
			embed.setFooter(`${techQoute.text} ~ ${techQoute.author}`);

			Object.keys(client.commands).forEach((key) => {
				const mappedNames = client.commands[key].map(command => '`' + command.name + '` ');
				embed.addField('› ' + key.charAt(0).toUpperCase() + key.slice(1), mappedNames.join(' '));
			});
		}
		message.channel.send(embed);
	},
};