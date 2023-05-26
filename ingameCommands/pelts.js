const { getPlayer, addCommas } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class PeltCommand extends BaseCommand {

    constructor() {
        super('pelts');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;
        const pelts = playerProfile?.trapper_quest?.pelt_count || 0;

        this.sendReply(`${username} has ${addCommas(pelts)} pelts`);
    }
}

module.exports = new PeltCommand();