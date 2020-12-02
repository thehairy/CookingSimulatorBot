const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');

module.exports = {
	name: 'duck',
	description: 'Sends random duck image!',
	usage: '`duck`',
	async execute(client, message) {
		let image = await api.duck();
		while(image.substr(image.length - 3) == 'mp4') {
			image = await api.duck();
		}
		const embed = new MessageEmbed()
			.setImage(image);
		message.channel.send(embed);
	},
};