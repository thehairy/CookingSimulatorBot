const recipe = require('../../recipe.json');
const possibleModes = ['normal', 'cac', 'pizza'];

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
	name: 'recipe',
	description: 'Sends a random recipe you should use from the specified gamemode!',
	usage: '`recipe normal|cac|pizza`',
	async execute(client, message, args) {
		if (args.length <= 0) return message.reply('You need to specify a mode!\n`recipe normal|cac|pizza`');
		if (!possibleModes.includes(args[0].toLowerCase())) return message.reply('You need to specify a mode!\n`recipe normal|cac|pizza`');
		let mode;
		switch (args[0].toLowerCase()) {
		case 'normal':
			mode = recipe.normal;
			break;
		case 'cac':
			mode = recipe.cac;
			break;
		case 'pizza':
			mode = recipe.pizza;
			break;
		}
		const recipeToCook = mode[getRandom(0, mode.length)];
		const msg = await message.reply('Hmm, let me think. :thinking:');
		setTimeout(() => {
			msg.edit(`You should make some \`${recipeToCook}\`!`);
		}, 5000);
	},
};