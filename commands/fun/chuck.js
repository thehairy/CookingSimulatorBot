const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');

module.exports = {
	name: 'chuck',
	description: 'Sends random Chuck Norris joke!',
	usage: '`chuck`',
	async execute(client, message) {
		const joke = await api.cnjoke();
		const embed = new MessageEmbed()
			.setDescription(joke);
		message.channel.send(embed);
	},
};