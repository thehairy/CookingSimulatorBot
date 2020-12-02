const Discord = require('discord.js');
const stringbucket = require('./stringbucket.json');
const fs = require('fs');
require('dotenv').config();
const MusicClient = require('./src/struct/client.js');

const mongoose = require('mongoose');
const GuildSettings = require('./settings.js');
const GuildCommands = require('./commands.js');
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const client = new MusicClient();

// Declaring command files
client.commands = {
	fun: new Discord.Collection(),
	moderation: new Discord.Collection(),
	music: new Discord.Collection(),
	other: new Discord.Collection,
};

const commandFilesFun = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.js'));
for (const file of commandFilesFun) {
	const command = require(`./commands/fun/${file}`);
	client.commands.fun.set(command.name, command);
}
const commandFilesModeration = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
for (const file of commandFilesModeration) {
	const command = require(`./commands/moderation/${file}`);
	client.commands.moderation.set(command.name, command);
}
const commandFilesMusic = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));
for (const file of commandFilesMusic) {
	const command = require(`./commands/music/${file}`);
	client.commands.music.set(command.name, command);
}
const commandFilesOther = fs.readdirSync('./commands/other').filter(file => file.endsWith('.js'));
for (const file of commandFilesOther) {
	const command = require(`./commands/other/${file}`);
	client.commands.other.set(command.name, command);
}

client.on('ready', () => {
	console.log('This bot is ready to share some hair! 🥞');
	client.user.setPresence({
		activity: {
			name: `Cooking Simulator`,
			type: 'PLAYING',
		},
		status: 'online',
	});
	// Set status every 5 minutes
	setInterval(() => {
		const activities = client.user.presence.activities;
		if (activities.size < 1 || activities[0].name !== `Cooking Simulator`) {
			client.user.setPresence({
				activity: {
					name: `Cooking Simulator`,
					type: 'PLAYING',
				},
				status: 'online',
			});
		}
	}, 300000);
});

client.on('message', async (message) => {
	// Content Filter - Rick Roll
	if (message.content.includes('dQw4w9WgXcQ')) {
		await message.delete({
			reason: 'Nobody likes getting Rick Roll\'d',
		});
		return message.author.send('You like Rick Roll\'n, don\'t you?').catch(console.error(''));
	}
	// Content Filter - TOS

	// Content Filter - Insults

	// Botception is bad. Really bad.
	if (message.author.bot) return;

	// Retrieving the guild settings from database.
	let storedSettings = await GuildSettings.findOne({
		gid: message.guild.id,
	});
	if (!storedSettings) {
		// If there are no settings stored for this guild, we create them and try to retrieve them again.
		const newSettings = new GuildSettings({
			gid: message.guild.id,
		});
		await newSettings.save().catch(() => {});
		storedSettings = await GuildSettings.findOne({
			gid: message.guild.id,
		});
	}

	if (!message.content.startsWith(storedSettings.prefix)) return;

	const args = message.content.slice(storedSettings.prefix.length).replace(/[ \r\n|\r|\n]/gi, ' ').trim().split(' ');
	const command = args.shift().toLowerCase();

	// Check if there is a command available
	const storedCommands = await GuildCommands.findOne({
		gid: message.guild.id,
		command: command,
	});
	if (storedCommands) {
		// Delete database entry if the text is undefined/empty
		if (storedCommands.text.length < 1) {
			GuildCommands.deleteOne({
				gid: message.guild.id,
				command: command,
			});
		} else {
			// Output the text
			message.channel.send(storedCommands.text);
		}
		return;
	}

	let aval = false;

	Object.keys(client.commands).forEach((key) => {
		if (client.commands[key].has(command)) aval = true;
	});

	if (!aval) return;

	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		message.GuildCommands = GuildCommands;
		message.GuildSettings = GuildSettings;
		message.storedSettings = storedSettings;

		Object.keys(client.commands).forEach((key) => {
			if (client.commands[key].has(command)) client.commands[key].get(command).execute(client, message, args);
			return;
		});
	} catch (error) {
		// Maybe send a nice and sexy emoji too
		// let emoji = message.guild.emojis.cache.find(emoji => emoji.name.includes("pepechrist"));
		console.error(error);
		message.reply('sorry, but the owner of the bot managed to destroy the bot.');
		client.users.fetch('211888560662511617').then(user => user.send('you fucked up'));
	}
});

client.login(process.env.TOKEN);
