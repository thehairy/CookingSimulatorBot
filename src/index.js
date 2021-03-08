const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
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
    
    // Slash Commands
    client.commands.forEach(command => {
        client.api.applications(client.user.id).guilds('632613831301922866').commands.post(command.create);
    })
})

client.on('message', (message) => {
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (client.commands.has(interaction.data.name)) {
        try {
            client.commands.get(interaction.data.name).execute(client, interaction);
        } catch (error) {
            console.error(error);
        }
    }
})

// Login
client.login(process.env.TOKEN);