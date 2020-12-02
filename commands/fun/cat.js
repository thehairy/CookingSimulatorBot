const { MessageEmbed } = require('discord.js');
const catFacts = require('get-cat-facts');
const api = require('random-stuff-api');

module.exports = {
	name: 'cat',
	description: 'Sends random cat image!',
	usage: '`cat`',
	async execute(client, message) {
		const result = await catFacts.random();
		let image = await api.cat();
		while (image.substr(image.length - 3) == 'mp4') {
			image = await api.cat();
		}
		const embed = new MessageEmbed()
			.setDescription(result[0].text)
			.setImage(image);
		message.channel.send(embed);
	},
};