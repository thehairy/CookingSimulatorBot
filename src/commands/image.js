const { MessageEmbed } = require('discord.js');
const catFacts = require('get-cat-facts');
const api = require('random-stuff-api');

const utils = require('../utils');

module.exports = {
    name: 'image',
    create: {
        data: {
            name: 'image',
            description: 'Show a random picture from a specific category!',
			options: [
				{
					name: 'category',
					description: 'Choose a cetegory!',
					type: 3,
					required: true,
					choices: [
						{
							name: "Cat",
							value: "cat"
						},
						{
							name: "Dog",
							value: "dog"
						},
						{
							name: "Duck",
							value: "duck"
						},
						{
							name: "Vase",
							value: "vase"
						}
					]
				}
			]
        }
    },
    async execute(client, interaction) {
		const category = interaction.data.options[0].value;
		let image = "";
		let fact = "";

		switch (category) {
			case 'cat': {
				image = await api.image.cat();
				while (image.substr(image.length - 3) == 'mp4') {
					image = await api.image.cat();
				}

				fact = (await catFacts.random())[0].text;
				break;
			}
			case 'dog': {
				image = await api.image.dog();
				while (image.substr(image.length - 3) == 'mp4') {
					image = await api.image.dog();
				}
				break;
			}
			case 'duck': {
				image = await api.image.duck();
				while (image.substr(image.length - 3) == 'mp4') {
					image = await api.image.duck();
				}
				break;
			}
			case 'vase': {
				image = await api.image.vase();
				while (image.substr(image.length - 3) == 'mp4') {
					image = await api.image.vase();
				}
				break;
			}
		}

		const embed = new MessageEmbed()
			.setDescription(fact)
			.setImage(image)

		await utils.sendEmbed(client, interaction, embed);
    }
}