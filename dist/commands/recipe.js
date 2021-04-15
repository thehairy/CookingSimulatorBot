import recipes from '../recipes.json';
import * as utils from '../utils.js';
export const name = 'recipe';
export const create = {
    name: 'recipe',
    description: 'Let the bot choose what to cook next!',
    options: [
        {
            name: 'mode',
            description: 'The gamemode you want to cook for!',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Normal',
                    value: 'normal'
                },
                {
                    name: 'Mobile',
                    value: 'mobile'
                },
                {
                    name: 'Cakes and Cookies DLC',
                    value: 'cac'
                },
                {
                    name: 'Pizza DLC',
                    value: 'pizza'
                }
            ]
        },
    ]
};
export const execute = async (client, interaction) => {
    // Informations
    const mode = interaction.options[0].value;
    let recipesMode = [];
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
        interaction.editReply(`You should make some **${recipeToCook}**!`);
    }, 5000);
};
//# sourceMappingURL=recipe.js.map