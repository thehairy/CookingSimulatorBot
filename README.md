# The official Hairy Discord Bot!

## Good to know
- Default prefix is '?', can be changed with "?prefix".
- Use ?help for a list of commands
- This bot uses MongoDB.
- Current version: v1.0.1-beta

## Features
- Join Roles | Gives specific roles to new users
- Moderation | Tag System (Custom Commands that let the bot return custom messages)
- Moderation | Ban (Bans a user)
- Moderation | Soft (Kicks a user, but deletes all messages in the past 7 days)
- Moderation | Kick (Kicks a user)
- Moderation | Bug (Reports a bug regarding the bot)
- Moderation | Help (Shows a list of commands)
- Configuration | Prefix (Changes the prefix)
- Configuration | Settings (Changes bot related settings)
- Music | Play (Plays a song by video URL)
- Music | Stop (Stops the playback)
- Music | Pause (Pauses the playback)
- Music | Queue (Shows the queue)
- Music | Volume (Sets the volume <0.3 - 5>)
- Music | Skip (Skips the current song)
- Music | NP (Shows the current playing song)
- Fun | Cat (Shows a random cat picture and a random cat fact)
- Fun | Dog (Shows a random dog picture)
- Fun | Duck (Shows a random duck picture)
- Fun | Vase (Shows a random vase picture)
- Fun | Chuck (Shows a random Chuck Norris joke)
- Fun | Dev (Shows a random dev joke)
- Basic | Avatar (Shows the avatar of the user)
- Basic | Ping (Shows the ping of the bot)

## Permissions
- Tag System | Create, Edit and Delete can only be used by members with the Role(s) set in the settings.
- Settins | To change bot settings, the member needs ADMINISTRATOR permission. I will soon change it to MANAGE_GUILD.
- Ban | To ban user, the member needs BAN_MEMBERS permission.
- Kick | To kick a user, the member needs KICK_MEMBERS permission.
- Soft | To softban a user, the member needs KICK_MEMBERS permission.

## How to contribute
1. Fork this repository
2. Clone your fork onto your local device
3. Create a ".env" file with the variable "TOKEN" and your token aswell as "DB_URL" with a MongoDB URL.
4. Install all dependencies with 'npm i'
5. <b>Make changes!</b>
6. Push your changes onto a (new) branch of your fork
7. Create a pull request from said branch to the development branch of this repository

## Requirements
- Node.js v12 or higher
- Latest version of NPM
- Latest version of discord.js (Currently v12.5.0 - Reply Branch)
- JavaScript and Node.js knowledge
