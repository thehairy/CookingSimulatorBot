module.exports = {
	name: 'ping',
	description: 'Pong',
	usage: '`ping`',
	execute(client, message) {
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Pong. Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	},
};
