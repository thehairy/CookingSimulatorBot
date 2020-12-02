const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Avatar-URL Embed',
	usage: '`avatar`',
	execute(client, message) {
		const member = message.mentions.members.first() || message.member;
		const embed = new MessageEmbed()
			.setTitle(`This is the avatar of ${member.displayName}`)
			.setImage(member.user.displayAvatarURL({ dynamic: true }));
		message.reply(embed);
	},
};