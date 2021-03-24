const utils = require('../utils');

module.exports = {
    name: 'kick',
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
		console.log(interaction.data.options);
		const guild = client.guilds.cache.get(interaction.guild_id);

		// Grab important informations
		const executor = await guild.members.fetch(interaction.member.user.id);
		const target = await guild.members.fetch(interaction.data.options[0].value)
		const targetUser = target.user;
		let reason = '';
		if (interaction.data.options.find(o => o.name.toLowerCase() == 'reason')) {
			purge = interaction.data.options.find(o => o.name.toLowerCase() == 'reason').value;
		}
		let purge = false;
		if (interaction.data.options.find(o => o.name.toLowerCase() == 'deletemessages')) {
			purge = interaction.data.options.find(o => o.name.toLowerCase() == 'deletemessages').value;
		}

		// Check if permissions are valid
		if (!utils.checkPermission(executor, 'KICK_MEMBERS')) return utils.sendHiddenMessage(client, interaction, 'You do not have the required permissions to kick a member.');
		if (!utils.higherRole(executor.roles.highest, target.roles.highest)) return utils.sendHiddenMessage(client, interaction, 'You do not have the required permissions to kick this member.');

		// Check if messages should be purged
		if (purge) {
			const banned = await target.ban({ days: 7, reason: reason});
			if (banned) {
				// Success
				guild.members.unban(targetUser);
				utils.sendHiddenMessageAck(client, interaction, 'Member successfully kicked.');
			} else {
				// No success
				utils.sendHiddenMessage(client, interaction, 'Something went wrong.');
			}
		} else {
			const kicked = await target.kick(reason);
			if (kicked) {
				// Success
				utils.sendHiddenMessageAck(client, interaction, 'Member successfully kicked.');
			} else {
				// No Success
				utils.sendHiddenMessage(client, interaction, 'Something went wrong.');
			}
		}
    }
}