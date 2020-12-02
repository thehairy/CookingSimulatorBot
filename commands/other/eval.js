module.exports = {
	name: 'eval',
	description: 'Just eval\'ing some stuff for the bot owner',
	usage: '`eval >toEval<`',
	execute(client, message, args) {
		const owners = ['359761233861279744', '211888560662511617'];
		if (!owners.includes(message.author.id)) return;
		try {
			const code = args.join(' ');
			let evaled = eval(code);
			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled);
			}
			message.channel.send(clean(evaled), {
				code: 'xl',
			}).then(msg => {
				msg.delete({
					timeout: 15000,
				});
			});
		} catch (err) {
			message.channel.send(`The fuck are you trying to do?\n\`\`\`${clean(err)}\`\`\``);
		}

		function clean(text) {
			if (typeof (text) === 'string') {
				return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			} else {
				return text;
			}
		}
	},
};