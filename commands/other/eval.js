const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const owners = ['359761233861279744', '211888560662511617'];

function clean(text) {
	if (typeof (text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return text;
	}
}

module.exports = {
	name: 'eval',
	description: 'Just eval\'ing some stuff for the bot owner',
	usage: '`eval >toEval<`',
	execute(client, message, args) {
		const code = args.join(' '); 

		const embed = new MessageEmbed().setTitle('**Eval**');
		embed.addField('Input', '```' + code + '```');

		if (!owners.includes(message.author.id)) return;
		try {
			let evaled = eval(code);
			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled);
			}
			embed.addField('Output', '```' + clean(evaled) + '```');
		} catch (err) {
			embed.addField('Error', `\`\`\`${clean(err.toString())}\`\`\``);
		}
		message.channel.send(embed);
	},
};