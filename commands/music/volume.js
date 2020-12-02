module.exports = {
	name: 'volume',
	description: 'Sets the volume of the current playback',
	usage: '`volume [0.3 - 5]`',
	cooldown: 5,
	execute(client, message, args) {
		const {
			channel,
		} = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		if (args[0] > 5) return message.channel.send('Volume 0.3 - 5');
		if (args[0] < 0.3) return message.channel.send('Volume 0.3 - 5');
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`I set the volume to: **${args[0]}**`);
	},
};