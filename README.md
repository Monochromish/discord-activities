# Discord Activities

Just a simple discord activities bot written in JavaScript that somehow supports slash commands and works exceptionally well, nothing much nothing less.

## Activities included

- [x] Awkword
- [x] Betrayal.io
- [x] Checkers
- [x] Chess In The Park
- [x] Doodle Crew
- [x] Fishington.io
- [x] Letter Tile
- [x] Poker Night
- [x] Putt Party
- [x] Spell Cast
- [x] Word Snack
- [x] Youtube Together

## Requirements

1. Node.js ( version 16.6 or newer ) from [here](https://nodejs.org).
2. A Discord Bot Token from [here](https://discord.com/developers/applications)

## How to setup

1. Download or Clone this repository.
2. Open terminal or console in the root folder and run `npm install`. This is a one-time operation; It installs the required dependencies.
3. Open the file named config.json in a text editor or an IDE and modify it.
   It should then look something like this:

```js
{
    "token": "YOUR DISCORD BOT TOKEN"
}
```

Save changes and either open start.bat file or run `node .` to run the discord bot.

## Common errors

1. Abort Controller /unexpected token '?' (node version)
   Discord.js v13 requires Node.js version 16.6 or newer to run!
2. Missing Access (Oauth2 scope for slash commands)
   Enable the `applications.commands` scope for your bot

## Credits

Code was written by [Monochromish](https://monolul.me).
If you come across any errors or need help with setting up, feel free to DM me on Discord.
