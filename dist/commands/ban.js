import { checkPermission, higherRole } from '../utils.js';
export const name = 'ban';
export const create = {
    name: 'ban',
    description: 'Bans a user! | Requires [BAN_MEMBERS]',
    options: [
        {
            name: 'user',
            description: 'The user who should be banned',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: 'STRING'
        }
    ]
};
export const execute = async (client, interaction) => {
    // Grab important informations
    const executor = interaction.member;
    const target = interaction.options.find(o => o.name == 'user')?.member;
    const reason = interaction.options.find(o => o.name == 'reason') ? interaction.options.find(o => o.name == 'reason')?.value : '';
    // Return error if executor or target are invalid
    if (!executor || !target)
        return interaction.editReply('Something went wrong!');
    // Check if permissions are valid
    if (!checkPermission(executor, 'BAN_MEMBERS'))
        return interaction.editReply('You do not have the required permissions to ban a member.');
    if (!higherRole(executor.roles.highest, target.roles.highest))
        return interaction.editReply('You do not have the required permissions to ban this member.');
    const banned = await target.ban({ days: 7, reason: reason }).catch(() => null);
    if (banned) {
        // Success
        return interaction.editReply('Member successfully banned!');
    }
    else {
        // No Success
        return interaction.editReply('Something went wrong!');
    }
};
//# sourceMappingURL=ban.js.map