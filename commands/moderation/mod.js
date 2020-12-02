const { Role, MessageEmbed } = require('discord.js');
const allowedModes = ['kick', 'soft', 'ban'];

module.exports = {
	name: 'mod',
	description: 'Moderation Commands',
	usage: '`mod kick/soft/ban @user reason`',
	execute: (client, message, args) => {
		if (!message.member.hasPermission('KICK_MEMBERS')) return;
		if (args.length <= 0) return;

		const targetMember = message.mentions.members.first();
		const targetUser = targetMember.user;
		const mode = args[0];
		const reason = args.slice(2).join(' ');
		const embed = new MessageEmbed();

		if (mode.length <= 0 || !allowedModes.includes(mode)) return message.reply('please provide a mode (kick, soft, ban).\nUsage: mod kick/soft/ban @user reason');
		if (mode.toLowerCase() == 'ban') if (!message.member.hasPermission('BAN_MEMBERS')) return;

		if (!targetMember) return message.reply('please provide a user to punish.\nUsage: mod kick/soft/ban @user reason');
		if (reason.length <= 0) return message.reply('please provide a reason.\nUsage: mod kick/soft/ban @user reason');

		if (Role.comparePositions(message.member.roles.highest, targetMember.roles.highest) < 0) return message.reply('nice try.');

		embed.setAuthor(`${message.author.tag} ${message.author.id}`, message.author.displayAvatarURL());
		embed.setThumbnail(targetUser.displayAvatarURL());
		embed.setFooter(`Case 404 - ${mode.toUpperCase()}`);
		embed.setDescription(`**Target:** \`${targetUser.tag}\` (${targetUser.id})\n**Action:** ${mode.charAt(0).toUpperCase() + mode.slice(1)}\n**Reason:** ${reason}`);

		if (targetMember.id == message.guild.ownerID) return message.reply('big weirdo you are.');

		if (mode.toLowerCase() == 'kick') {
			if (!targetMember.kickable) return message.reply('cannot kick this user.');
			targetMember.kick(reason);
		} else if (mode.toLowerCase() == 'soft') {
			if (!targetMember.bannable) return message.reply('cannot softban this user.');
			targetMember.ban({
				reason: reason,
				days: 7,
			}).then(() => {
				message.guild.members.unban(targetUser);
			});
		} else if (mode.toLowerCase() == 'ban') {
			if (!targetMember.bannable) return message.reply('cannot ban this user.');
			targetMember.ban({
				reason: reason,
				days: 7,
			});
		} else {
			return message.reply('duh');
		}
		const channel = message.guild.channels.cache.get(message.storedSettings.systemChannel || message.guild.systemChannelID || message.channel.id);
		channel.send(embed);
		message.react('✅');
	},
};