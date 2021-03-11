const { MessageEmbed } = require('discord.js');
const catFacts = require('get-cat-facts');
const api = require('random-stuff-api');

const utils = require('../utils');

module.exports = {
    name: 'joke',
    create: {
        data: {
            name: 'joke',
            description: 'Show a joke from a specific category!',
			options: [
				{
					name: 'category',
					description: 'Choose a cetegory!',
					type: 3,
					required: true,
					choices: [
						{
							name: "Normal",
							value: "normal"
						},
						{
							name: "Chuck Norris",
							value: "cn"
						},
						{
							name: "Developer",
							value: "dev"
						}
					]
				}
			]
        }
    },
    async execute(client, interaction) {
		const category = interaction.data.options[0].value;
		
		let joke = "";

		switch (category) {
			case 'normal': {
				joke = await api.random.joke();
				break;
			}
			case 'cn': {
				joke = await api.random.cnjoke();
				break;
			}
			case 'dev': {
				joke = await api.random.devjoke();
				break;
			}
		}

		const embed = new MessageEmbed()
			.setDescription(joke);

		await utils.sendEmbed(client, interaction, embed);
    }
}