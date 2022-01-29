const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		//Running Slash Commands, pretty basic
		const SlashCommands = client.slashCommands.get(interaction.commandName);
		if (!SlashCommands) return;
		try {
			await SlashCommands.run(client, interaction);
		} catch (error) {
			if (interaction.replied) {
				await interaction
					.editReply({
						embeds: [
							new MessageEmbed()
								.setColor('BLURPLE')
								.setDescription('An unexpected error occurred.\nPlease try again later.')
						]
					})
					.catch(() => {});
			} else {
				await interaction
					.followUp({
						ephemeral: true,
						embeds: [
							new MessageEmbed()
								.setColor('BLURPLE')
								.setDescription('An unexpected error occurred.\nPlease try again later.')
						]
					})
					.catch(() => {});
			}
			client.logger.error(error);
		}
	} else return;
};
