module.exports = {
	name: 'resume',
	description: 'Resumes playback',
	usage: '`resume`',
	cooldown: 5,
	execute(client, message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	},
};