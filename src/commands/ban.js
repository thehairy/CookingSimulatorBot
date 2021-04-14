const utils = require('../utils');

module.exports = {
    name: 'ban',
	hidden: true,
    create: {
        data: {
            name: 'ban',
            description: 'Bans a user! | Requires [BAN_MEMBERS]',
            options: [
                {
                    name: 'user',
                    description: 'The user who should be banned',
                    type: 6,
                    required: true
                },
				{
					name: 'reason',
					description: 'The reason for the ban',
					type: 3
				}
            ]
        }
    },
    async execute(client, interaction) {
		const guild = client.guilds.cache.get(interaction.guildID);

		// Grab important informations
		const executor = interaction.member;
		const target = interaction.options.find(o => o.name == 'user').member;
		const reason = interaction.options.find(o => o.name == 'reason') ? interaction.options.find(o => o.name == 'reason').value : '';

		// Return error if executor or target are invalid
		if (!executor || !target) return interaction.editReply('Something went wrong!', { ephemeral: true })

		// Check if permissions are valid
		if (!utils.checkPermission(executor, 'BAN_MEMBERS')) return interaction.editReply('You do not have the required permissions to ban a member.', { ephemeral: true });
		if (!utils.higherRole(executor.roles.highest, target.roles.highest)) return interaction.editReply('You do not have the required permissions to ban this member.', { ephemeral: true });

		const banned = await target.ban({ days: 7, reason: reason }).catch(() => null);
		if (banned) {
			// Success
			return interaction.editReply('Member successfully banned!', { ephemeral: true });
		} else {
			// No Success
			return interaction.editReply('Something went wrong!', { ephemeral: true });
		}
    }
}
