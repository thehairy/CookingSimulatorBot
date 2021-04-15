/* eslint-disable no-unused-vars */
import Discord from 'discord.js';

declare module 'discord.js' {
    interface Client {
        commands: Discord.Collection<string, Command>;
    }
}

interface Command {
    name: string;
    hidden?: boolean;
    create: Discord.ApplicationCommandData;
    async execute(client: Discord.Client, interaction: Discord.CommandInteraction): Promise<void> | void;
}
