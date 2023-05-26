const BaseCommand = require('./baseCommand.js');
const { getGuildMemberData } = require('../helper/functions.js');

class DiscordCommand extends BaseCommand {

    constructor() {
        super('discord');
    }

    execute = async (message, messageAuthor) => {
        let { username } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getGuildMemberData(username);
        const playerData = searchedPlayer.player;

        let discord = playerData?.socialMedia?.links?.DISCORD;
        if (!discord) return this.sendReply(`${username} did not connect a discord account`);

        return this.sendReply(`Discord tag for ${username}: ${discord}`);
    }
}

module.exports = new DiscordCommand();