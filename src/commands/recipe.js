const { WebhookClient } = require('discord.js');
const recipes = require('../recipes.json');
const utils = require('../utils');

module.exports = {
    name: 'recipe',
    create: {
        data: {
            name: 'recipe',
            description: 'Let the bot choose what to cook next!',
			options: [
				{
					name: "mode",
					description: "The gamemode you want to cook for!",
					type: 3,
					required: true,
					choices: [
						{
							name: "Normal",
							value: "normal"
						},
						{
							name: "Mobile",
							value: "mobile"
						},
						{
							name: "Cakes and Cookies DLC",
							value: "cac"
						},
						{
							name: "Pizza DLC",
							value: "pizza"
						}
					]
				},
			]
        }
    },
    async execute(client, interaction) {
		// Informations
		const mode = interaction.options[0].value;
		const channel = client.channels.cache.get(interaction.channelID);

		let recipesMode;
		switch (mode) {
			case 'normal': {
				recipesMode = recipes.normal;
				break;
			}
			case 'mobile': {
				recipesMode = recipes.mobile;
				break;
			}
			case 'cac': {
				recipesMode = recipes.cac;
				break;
			}
			case 'pizza': {
				recipesMode = recipes.pizza;
				break;
			}
		}

		const recipeToCook = recipesMode[utils.getRandom(0, recipesMode.length)];
		setTimeout(() => {
			interaction.editReply(`You should make some **${recipeToCook}**!`)
		}, 5000);
    }
}