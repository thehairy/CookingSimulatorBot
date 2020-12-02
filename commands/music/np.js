module.exports = {
	name: 'np',
	description: 'What is currently playing?',
	usage: '`np`',
	cooldown: 5,
	execute(client, message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	},
};