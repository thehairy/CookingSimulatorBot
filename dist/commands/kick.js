import { checkPermission, higherRole } from '../utils.js';
export const name = 'kick';
export const hidden = true;
export const create = {
    name: 'kick',
    description: 'Kicks a user! | Requires [KICK_MEMBERS]',
    options: [
        {
            name: 'user',
            description: 'The user who should be kicked',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the kick',
            type: 'STRING'
        },
        {
            name: 'deleteMessages',
            description: 'If the messages of this user should be deleted',
            type: 'BOOLEAN'
        }
    ]
};
export const execute = async (client, interaction) => {
    const guild = client.guilds.cache.get(interaction.guildID);
    // Grab important informations
    const executor = interaction.member;
    const target = interaction.options.find(o => o.name == 'user')?.member;
    const targetUser = target.user;
    let reason = '';
    if (interaction.options.find(o => o.name.toLowerCase() == 'reason')) {
        reason = interaction.options.find(o => o.name.toLowerCase() == 'reason')?.value;
    }
    let purge = false;
    if (interaction.options.find(o => o.name.toLowerCase() == 'deletemessages')) {
        purge = interaction.options.find(o => o.name.toLowerCase() == 'deletemessages')?.value;
    }
    // Check if permissions are valid
    if (!checkPermission(executor, 'BAN_MEMBERS'))
        return interaction.editReply('You do not have the required permissions to kick a member.');
    if (!higherRole(executor.roles.highest, target.roles.highest))
        return interaction.editReply('You do not have the required permissions to kick this member.');
    // Check if messages should be purged
    if (purge) {
        const banned = await target.ban({ days: 7, reason: reason }).catch(() => null);
        if (banned) {
            // Success
            guild.members.unban(targetUser);
            return interaction.editReply('Member successfully kicked!');
        }
        else {
            // No success
            return interaction.editReply('Something went wrong!');
        }
    }
    else {
        const kicked = await target.kick(reason).catch(() => null);
        if (kicked) {
            // Success
            return interaction.editReply('Member successfully kicked!');
        }
        else {
            // No Success
            return interaction.editReply('Something went wrong!');
        }
    }
};
//# sourceMappingURL=kick.js.map