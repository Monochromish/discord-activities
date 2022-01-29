const { Client } = require('discord.js');
const { readdirSync } = require('fs');

/**
 * @param {Client} client
 */

module.exports = async client => {
	//Logging error messages and handling them
	client.on('disconnect', () => client.logger.info('Bot is disconnecting...'));
	client.on('reconnecting', () => client.logger.info('Bot reconnecting...'));
	client.on('warn', error => client.logger.error(error));
	client.on('error', error => client.logger.error(error));
	process.on('unhandledRejection', error => client.logger.error(error));
	process.on('uncaughtException', error => client.logger.error(error));

	//Locating Events Folder and binding events
	readdirSync('./events/').forEach(file => {
		const event = require(`../events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});

	//Locating Slash Commands Folder and registering them
	const data = [];
	readdirSync('./slashCommands/').forEach(dir => {
		const slashCommandFile = readdirSync(`./slashCommands/${dir}/`).filter(files => files.endsWith('.js'));

		for (const file of slashCommandFile) {
			const slashCommand = require(`../slashCommands/${dir}/${file}`);
			if (!slashCommand.name)
				return console.error(`Slash Command Error: ${slashCommand.split('.')[0]} application name is required.`);
			if (!slashCommand.description) slashCommand.description = 'No description provided';
			client.slashCommands.set(slashCommand.name, slashCommand);
			data.push(slashCommand);
		}
	});

	client.on('ready', async () => {
		await client.application.commands.set(data);
	});
};
