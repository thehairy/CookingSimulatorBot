import { MessageEmbed } from 'discord.js';
import api from 'random-stuff-api';
export const name = 'joke';
export const create = {
    name: 'joke',
    description: 'Show a joke from a specific category!',
    options: [
        {
            name: 'category',
            description: 'Choose a cetegory!',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Normal',
                    value: 'normal'
                },
                {
                    name: 'Chuck Norris',
                    value: 'cn'
                },
                {
                    name: 'Developer',
                    value: 'dev'
                }
            ]
        }
    ]
};
export const execute = async (client, interaction) => {
    const category = interaction.options[0].value;
    let joke = '';
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
    await interaction.editReply(embed);
};
//# sourceMappingURL=joke.js.map