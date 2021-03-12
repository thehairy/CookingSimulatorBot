const utils = require('../utils');

module.exports = {
    name: 'ban',
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
		console.log(interaction.data.options);
		const guild = client.guilds.cache.get(interaction.guild_id);

		// Grab important informations
		const executor = await guild.members.fetch(interaction.member.user.id);
		const target = await guild.members.fetch(interaction.data.options.find(o => o.name == 'user').value)
		const reason = interaction.data.options.find(o => o.name == 'reason') ? interaction.data.options.find(o => o.name == 'reason').value : '';

		// Return error if executor or target are invalid
		if (!executor || !target) return utils.sendHiddenMessage(client, interaction, 'Something went wrong!');

		// Check if permissions are valid
		if (!utils.checkPermission(executor, 'BAN_MEMBERS')) return utils.sendHiddenMessage(client, interaction, 'You do not have the required permissions to ban a member.');
		if (!utils.higherRole(executor.roles.highest, target.roles.highest)) return utils.sendHiddenMessage(client, interaction, 'You do not have the required permissions to ban this member.');

		const banned = await target.ban({ reason: reason });
		if (banned) {
			// Success
			return utils.sendHiddenMessageAck(client, interaction, 'Member successfully banned.');
		} else {
			// No Success
			return utils.sendHiddenMessage(client, interaction, 'Something went wrong.');
		}
    }
}