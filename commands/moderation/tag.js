/* eslint-disable no-case-declarations */
const fs = require('fs');

module.exports = {
	name: 'tag',
	description: 'Creates/Edits a tag',
	usage: '`tag create|edit|source|delete|list [command] (content)`',
	async execute(client, message, args) {
		// Get roleids from stored settings
		let check = false;
		if (message.author.id == '211888560662511617') check = true;
		const roleIDArray = message.storedSettings.tagPermissionGroups.split(',');
		roleIDArray.forEach(async (roleID) => {
			if (message.member.roles.cache.has(roleID)) check = true;
		});
		if (args.length < 1) return;
		let storedCommand;
		let response;
		switch (args[0]) {
		case 'create':
			if (!check) return;
			if (!args[1]) return;
			// eslint-disable-next-line no-case-declarations
			const commandFiles = fs.readdirSync('./commands')
				.filter((file) => file == `${args[1]}.js`);
			if (commandFiles.length > 0) {
				message.reply('you are restricted from creating this tag!');
				return;
			}
			storedCommand = await message.GuildCommands.findOne({
				gid: message.guild.id,
				command: args[1],
			});
			if (!storedCommand) {
				const newCommands = new message.GuildCommands({
					gid: message.guild.id,
					command: args[1],
					text: message.content.slice(
						message.storedSettings.prefix.length +
						args[0].length +
						args[1].length +
						5,
					),
				});
				await newCommands.save().catch(() => {});
				storedCommand = await message.GuildCommands.findOne({
					gid: message.guild.id,
					command: args[1],
				});
				if (!storedCommand) {
					message.reply('an error occured, please try again or contact the bot support.');
				} else {
					message.reply(`${storedCommand.command} successfully created.`);
				}
			} else {
				message.reply('this tag already exists!');
			}
			break;
		case 'edit':
			if (!args[1]) return;
			if (!check) return;
			storedCommand = await message.GuildCommands.findOne({
				gid: message.guild.id,
				command: args[1],
			});
			if (!storedCommand) {
				message.reply('no command found');
			} else {
				storedCommand.text = message.content.slice(
					message.storedSettings.prefix.length +
					args[0].length +
					args[1].length +
					5,
				);
				await storedCommand.save().catch(() => {});
				message.reply(`${args[1]} successfully edited.`);
			}
			break;
		case 'source':
			if (!args[1]) return;
			storedCommand = await message.GuildCommands.findOne({
				gid: message.guild.id,
				command: args[1],
			});
			if (!storedCommand) {
				message.reply('no command found');
			} else {
				message.channel.send('```' + storedCommand.text.replace(/```+/g, '\u200b`\u200b`\u200b`'));
			}
			break;
		case 'delete':
			if (!check) return;
			if (!args[1]) return;
			response = await message.GuildCommands.deleteOne({
				gid: message.guild.id,
				command: args[1],
			});
			if (response.deletedCount < 1) {
				message.reply(`${args[1]} could not be deleted.`);
			} else {
				message.reply(`${args[1]} successfully deleted.`);
			}
			break;
		case 'list':
			const storedCommands = await message.GuildCommands.find({
				gid: message.guild.id,
			});
			response = `found ${storedCommands.length} tags: `;
			storedCommands.forEach((command) => {
				response += `\`${command.command}\` `;
			});
			message.reply(response);
			break;
		}
	},
};
