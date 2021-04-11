const utils = require('../utils');

module.exports = {
    name: 'kick',
	hidden: true,
    create: {
        data: {
            name: 'kick',
            description: 'Kicks a user! | Requires [KICK_MEMBERS]',
            options: [
                {
                    name: 'user',
                    description: 'The user who should be kicked',
                    type: 6,
                    required: true
                },
				{
					name: 'reason',
					description: 'The reason for the kick',
					type: 3
				},
				{
					name: 'deleteMessages',
					description: 'If the messages of this user should be deleted',
					type: 5
				}
            ]
        }
    },
    async execute(client, interaction) {
		const guild = client.guilds.cache.get(interaction.guildID);

		// Grab important informations
		const executor = interaction.member;
		const target = interaction.options.find(o => o.name == 'user').member;
		const targetUser = target.user;

		let reason = '';
		if (interaction.options.find(o => o.name.toLowerCase() == 'reason')) {
			reason = interaction.options.find(o => o.name.toLowerCase() == 'reason').value;
		}
		let purge = false;
		if (interaction.options.find(o => o.name.toLowerCase() == 'deletemessages')) {
			purge = interaction.options.find(o => o.name.toLowerCase() == 'deletemessages').value;
		}

		// Check if permissions are valid
		if (!utils.checkPermission(executor, 'BAN_MEMBERS')) return interaction.editReply('You do not have the required permissions to kick a member.', { ephemeral: true });
		if (!utils.higherRole(executor.roles.highest, target.roles.highest)) return interaction.editReply('You do not have the required permissions to kick this member.', { ephemeral: true });

		// Check if messages should be purged
		if (purge) {
			const banned = await target.ban({ days: 7, reason: reason});
			if (banned) {
				// Success
				guild.members.unban(targetUser);
				return interaction.editReply('Member successfully kicked!', { ephemeral: true });
			} else {
				// No success
				return interaction.editReply('Something went wrong!', { ephemeral: true });
			}
		} else {
			const kicked = await target.kick(reason);
			if (kicked) {
				// Success
				return interaction.editReply('Member successfully kicked!', { ephemeral: true });
			} else {
				// No Success
				return interaction.editReply('Something went wrong!', { ephemeral: true });
			}
		}
    }
}