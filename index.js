const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Yo boi!! Bot is online!'));

app.listen(port, () =>
	console.log(`Your app is listening to http://localhost:${port}`)
);

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
client.categories = readdirSync('./slashCommands/');
client.logger = consola;
require('./handler/Client')(client);

//Verifying Config.json and Logging in Client
if (!process.env.TOKEN) {
	client.logger.error('Client token must be provided in config.json');
} else {
	client.login(process.env.TOKEN);
}
