module.exports = {
	name: 'queue',
	description: 'Shows the current queue',
	usage: '`queue`',
	cooldown: 5,
	execute(client, message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
			__**Song queue:**__
			${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
			**Now playing:** ${serverQueue.songs[0].title}
		`);
	},
};