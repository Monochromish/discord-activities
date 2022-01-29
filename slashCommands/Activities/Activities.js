const { CommandInteraction, Client } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
	name: 'activities',
	description: 'Discord Together Activities.',
	options: [
		{
			name: 'activities',
			type: 'STRING',
			description: 'Select an activity.',
			required: true,
			choices: [
				{
					name: 'Awkword',
					value: 'awkword'
				},
				{
					name: 'Betrayal.io',
					value: 'betrayal'
				},
				{
					name: 'Checkers',
					value: 'checkers'
				},
				{
					name: 'Chess In The Park',
					value: 'chess'
				},
				{
					name: 'Doodle Crew',
					value: 'doodle'
				},
				{
					name: 'Fishington.io',
					value: 'fishington'
				},
				{
					name: 'Letter Tile',
					value: 'letter'
				},
				{
					name: 'Poker Night',
					value: 'poker'
				},
				{
					name: 'Putt Party',
					value: 'putt'
				},
				{
					name: 'Spell Cast',
					value: 'spell'
				},
				{
					name: 'Word Snack',
					value: 'word'
				},
				{
					name: 'Youtube Together',
					value: 'youtube'
				}
			]
		}
	],
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	run: async (client, interaction) => {
		await interaction.deferReply({
			ephemeral: true
		});
		if (!interaction.replied) await interaction.deferReply().catch(() => {});

		let id;
		if (!interaction.member.voice.channel)
			return interaction.editReply('You must be in a voice channel to use this command');

		if (interaction.options.get('activities').value === 'awkword') id = '879863881349087252';
		if (interaction.options.get('activities').value === 'betrayal') id = '773336526917861400';
		if (interaction.options.get('activities').value === 'checkers') id = '832013003968348200';
		if (interaction.options.get('activities').value === 'chess') id = '832012774040141894';
		if (interaction.options.get('activities').value === 'doodle') id = '878067389634314250';
		if (interaction.options.get('activities').value === 'fishington') id = '814288819477020702';
		if (interaction.options.get('activities').value === 'letter') id = '879863686565621790';
		if (interaction.options.get('activities').value === 'poker') id = '755827207812677713';
		if (interaction.options.get('activities').value === 'putt') id = '763133495793942528';
		if (interaction.options.get('activities').value === 'spell') id = '852509694341283871';
		if (interaction.options.get('activities').value === 'word') id = '879863976006127627';
		if (interaction.options.get('activities').value === 'youtube') id = '755600276941176913';

		fetch(`https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: `${id}`,
				target_type: 2,
				temporary: false,
				validate: null
			}),
			headers: {
				Authorization: `Bot ${client.token}`,
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(invite => {
				if (!invite.code) return interaction.followUp('I am unable to host activity.');

				interaction.followUp({
					content: 'Click on the button to join activity.',
					ephemeral: true,
					components: [
						new MessageActionRow().addComponents(
							new MessageButton()
								.setLabel('Join Activity')
								.setURL(`https://discord.com/invite/${invite.code}`)
								.setStyle('LINK')
						)
					]
				});
			});
	}
};
