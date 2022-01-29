//Importing Dependencies
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const consola = require('consola');

//Creating and Exporting Client
const client = new Client({
	shards: 'auto',
	intents: 32767,
	allowedMentions: {
		parse: ['everyone', 'roles', 'users'],
		repliedUser: true
	},
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
});
module.exports = client;

client.slashCommands = new Collection();
client.config = require('./config.json');
client.categories = readdirSync('./slashCommands/');
client.logger = consola;
require('./handler/Client')(client);

//Verifying Config.json and Logging in Client
if (!client.config.token) {
	client.logger.error('Client token must be provided in config.json');
} else {
	client.login(client.config.token);
}
