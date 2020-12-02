const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');

module.exports = {
	name: 'dog',
	description: 'Sends random dog image!',
	usage: '`dog`',
	async execute(client, message) {
		let image = await api.dog();
		while(image.substr(image.length - 3) == 'mp4') {
			image = await api.dog();
		}
		const embed = new MessageEmbed()
			.setImage(image);
		message.channel.send(embed);
	},
};