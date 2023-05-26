const BaseCommand = require('./baseCommand.js');
const { getGuildMemberData, addCommas } = require('../helper/functions.js');

class SecretCommand extends BaseCommand {

    constructor() {
        super('secrets');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getGuildMemberData(username, profile);
        const playerProfile = searchedPlayer.player;

        const secrets = playerProfile.achievements?.skyblock_treasure_hunter || 0;

        return this.sendReply(`${username} found ${addCommas(secrets)} secrets`);
    }
}

module.exports = new SecretCommand();