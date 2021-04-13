const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const utils = require('./utils');
require('dotenv').config();

// Intents, Client & Commands
const intents = new Intents();
intents.add('GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES');
const client = new Client({ disableMentions: 'everyone', intents: intents });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Events
client.on('ready', () => {
    console.log('Client ready to rumble!');

	client.user.setPresence({
		activity: {
			name: 'Cooking Simulator',
			type: 'PLAYING',
		},
		status: 'online',
	})

	setInterval(() => {
		client.user.setPresence({
			activity: {
				name: 'Cooking Simulator',
				type: 'PLAYING',
			},
			status: 'online',
		})
	}, 21600000);
})

client.on('message', (message) => {
	// Check for "release"
	if (message.channel.id == '767708787967918081' || true) return checkMessage(message);
	// Eval
	if (message.author.id == '211888560662511617' && message.content.startsWith('?')) {
		const args = message.content.slice(1).replace(/[ \r\n|\r|\n]/gi, ' ').trim().split(' ');
		const command = args.shift().toLowerCase();

		if (command == 'eval') {
			const code = args.join(' ');

			const embed = new MessageEmbed().setTitle('**Eval**');
			embed.addField('Input', '```' + code + '```'); 

			try {
				let evaled = eval(code);
				if (typeof evaled !== 'string') {
					evaled = require('util').inspect(evaled);
				}
				embed.addField('Output', '```' + utils.clean(evaled) + '```');
			} catch (err) {
				embed.addField('Error', `\`\`\`${utils.clean(err.toString())}\`\`\``);
			}

			message.channel.send(embed);
		}
	}
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
	today = new Date();
	aprilFools = new Date('04-01-2021');
	if (today.getDate() == aprilFools.getDate() && today.getMonth() == aprilFools.getMonth()) {
		utils.sendMessage(client, interaction, 'https://giphy.com/gifs/rickroll-rick-astley-never-gonna-give-you-up-Vuw9m5wXviFIQ');
	} else if (client.commands.has(interaction.data.name)) {
        try {
            client.commands.get(interaction.data.name).execute(client, interaction);
        } catch (error) {
            console.error(error);
        }
    }
})

const checkMessage = (message) => {
	if (message.content.includes('?') && message.content.includes('release')) {
		message.reply('All new information about the CS VR release can be found in <#587658747220983817>.');
	}
}

// Login
client.login();