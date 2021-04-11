module.exports = {
    name: 'ping',
    create: {
        data: {
            name: 'ping',
            description: 'Ping Pong!'
        }
    },
    execute(client, interaction) {
        interaction.editReply(':tada: | Still alive!');
    }
}