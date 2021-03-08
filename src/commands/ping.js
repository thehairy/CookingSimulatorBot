module.exports = {
    name: 'ping',
    create: {
        data: {
            name: 'ping',
            description: 'Ping Pong!'
        }
    },
    execute(client, interaction) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Pong! ${client.ws.ping}ms...`
                }
            }
        })
    }
}