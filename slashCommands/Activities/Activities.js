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
					name: 'Watch Together', 
					value: 'watchtogether' 
				},
				{
					name: 'Sketch Heads', 
					value: 'sketchheads' 
				},
				{
					name: 'Know What I Meme (New!)', 
					value: 'knowwhatimeme' 
				},
				{
					name: 'Ask Away (New!)', 
					value: 'askaway' 
				},
				{
					name: 'Word Snacks',
					value: 'wordsnacks'
				},
				{
					name: 'Bash Out (New! Requires Boost Level 1)',
					value: 'bashout'
				},
				{
					name: 'Bobble League (Requires Boost Level 1)',
					value: 'bobbleleague'
				},
				{
					name: 'Poker Night (Requires Boost Level 1)',
					value: 'pokernight'
				},
				{
					name: 'Putt Party (Requires Boost Level 1)',	
          				value: 'puttparty'
				},
				{
					name: 'Land-io (Requires Boost Level 1)',
					value: 'landio'
				},
				{
					name: 'Blazing 8s (Requires Boost Level 1)',
					value: 'blazing'
				},
        {
					name: 'Chess In The Park (Requires Boost Level 1)',//-
					value: 'chess'
				},
        {
					name: 'SpellCast (Requires Boost Level 1)',
					value: 'spellcast'
				},
        {
					name: 'Letter League (Requires Boost Level 1)',
					value: 'letterleague'
				},
				{
					name: 'Checkers In The Park (Requires Boost Level 1)',
					value: 'checkers'
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

    
		if (interaction.options.get('activities').value === 'watchtogether') id = '880218394199220334';
		if (interaction.options.get('activities').value === 'sketchheads') id = '902271654783242291';
		if (interaction.options.get('activities').value === 'knowwhatimeme') id = '950505761862189096';
		if (interaction.options.get('activities').value === 'askaway') id = '976052223358406656';
		if (interaction.options.get('activities').value === 'wordsnacks') id = '879863976006127627';
		if (interaction.options.get('activities').value === 'bashout') id = '1006584476094177371';
		if (interaction.options.get('activities').value === 'bobbleleague') id = '947957217959759964';
		if (interaction.options.get('activities').value === 'pokernight') id = '755827207812677713';
		if (interaction.options.get('activities').value === 'puttparty') id = '945737671223947305';
		if (interaction.options.get('activities').value === 'landio') id = '903769130790969345';
		if (interaction.options.get('activities').value === 'blazing') id = '832025144389533716';
		if (interaction.options.get('activities').value === 'chess') id = '832012774040141894';
    		if (interaction.options.get('activities').value === 'spellcast') id = '852509694341283871';
    		if (interaction.options.get('activities').value === 'letterleague') id = '879863686565621790';
    		if (interaction.options.get('activities').value === 'checkers') id = '832013003968348200';

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
