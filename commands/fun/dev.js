const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');

module.exports = {
	name: 'dev',
	description: 'Sends random dev joke!',
	usage: '`dev`',
	async execute(client, message) {
		const joke = await api.devjoke();
		const embed = new MessageEmbed()
			.setDescription(joke);
		message.channel.send(embed);
	},
};