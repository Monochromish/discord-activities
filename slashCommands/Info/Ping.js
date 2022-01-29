const { CommandInteraction, Client } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Displays Bot's API ping",
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	run: async (client, interaction) => {
		await interaction.deferReply({
			ephemeral: true
		});
		if (!interaction.replied) await interaction.deferReply().catch(() => {});

		interaction.followUp({
			embeds: [
				new MessageEmbed()
					.setColor('BLURPLE')
					.setTitle('Pong')
					.setDescription(`My API ping is \`${Math.round(client.ws.ping)}\`ms; not half bad eh?`)
			],
			ephemeral: true
		});
	}
};
