module.exports = {
	name: 'info',
	description: 'Returns some informations about the user',
	usage: '`info (@user)`',
	async execute(client, message) {
		// Make sure this command was only executed in #support-bot
		// if (message.channel.name !== "support-bot") return;
		// Delete message if role gets pinged
		if (message.mentions.roles.size > 0) {
			await message.author.send('We don\'t ping roles for that....').catch(console.error(''));
			message.delete();
			return;
		}

		if (message.channel.id !== '732174841095913472') return;

		const member = message.mentions.members.first() != null ? message.mentions.members.first() : message.member;
		const joined = member.joinedAt;
		const created = member.user.createdAt;

		// TODO: Format the date. There is a resource in the guide on how to format it.
		const joinedArray = joined.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ');
		const joinedN = joinedArray[0].split('-');
		const joinedDay = joinedN[2] == '01' ? '1st' : joinedN[2] == '02' ? '2nd' : joinedN[2] == '03' ? '3rd' : joinedN[2] + 'th';
		const days = Math.round((new Date() - joined) / 1000 / 60 / 60 / 24);

		const daysSinceCreated = Math.round((new Date() - created) / 1000 / 60 / 60 / 24);
		let createdString = '';
		if (daysSinceCreated < 365) {
			createdString = `${daysSinceCreated} days`;
		} else {
			const weirdThing = daysSinceCreated / 365 + '';
			const years = 1 * parseInt(weirdThing.substr(0, weirdThing.indexOf('.')));
			createdString = `${years} ${years == 1 ? 'year' : 'years'} and ${daysSinceCreated - (years * 365)} days`;
		}

		let rolesString = '';
		member.roles.cache.forEach(role => {
			if (role.name !== '@everyone') {
				rolesString += `<@&${role.id}> `;
			}
		});
		// Create sexy embed!
		const embedMentioned = {
			color: 0x00ffff,
			title: (member.displayName) + ' - ' + getStatus(member.presence.status),
			thumbnail: {
				url: member.user.displayAvatarURL(),
			},
			fields: [{
				name: 'Joined: ',
				value: joinedDay.replace('0', '') + ' of ' + getMonth(joinedN[1]) + ' ' + joinedN[0],
			},
			{
				name: 'Premium',
				value: member.premiumSince != null ? 'Yep' : 'Nope',
			},
			{
				name: 'Roles',
				value: rolesString.replace('<&@everyone>', '') == '' ? 'None' : rolesString.replace('<&@everyone>', '`None`'),
			},
			{
				name: 'Avatar',
				value: `[Click to open](${member.user.displayAvatarURL()})`,
			},
			{
				name: 'Did you know...',
				value: `...that already ${days} days have passed since the member joined?\n...that the member uses Discord for ${createdString} now?`,
			},
			],
			footer: {
				text: 'Time is relative, as always.',
			},
		};
		message.channel.send({
			embed: embedMentioned,
		});
	},
};

function getMonth(month) {
	switch (month) {
	case '01':
		return 'January';
	case '02':
		return 'February';
	case '03':
		return 'March';
	case '04':
		return 'April';
	case '05':
		return 'May';
	case '06':
		return 'June';
	case '07':
		return 'July';
	case '08':
		return 'August';
	case '09':
		return 'September';
	case '10':
		return 'October';
	case '11':
		return 'November';
	case '12':
		return 'December';
	}
}

function getStatus(status) {
	switch (status) {
	case 'online':
		return 'Online';
	case 'idle':
		return 'AFK';
	case 'offline':
		return 'Offline';
	case 'dnd':
		return 'Do Not Disturb';
	default:
		return 'Status not available';
	}
}