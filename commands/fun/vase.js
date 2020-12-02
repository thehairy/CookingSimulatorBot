const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');

module.exports = {
	name: 'vase',
	description: 'Sends random vase image!',
	usage: '`vase`',
	async execute(client, message) {
		let image = await api.vase();
		while(image.substr(image.length - 3) == 'mp4') {
			image = await api.vase();
		}
		const embed = new MessageEmbed()
			.setImage(image);
		message.channel.send(embed);
	},
};