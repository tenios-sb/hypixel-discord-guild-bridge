const { addCommas, getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class DolphinCommand extends BaseCommand {

    constructor() {
        super('dolphin');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const ores = playerProfile?.stats?.pet_milestone_sea_creatures_killed || 0;
        return this.sendReply(`${username} killed ${addCommas(ores)} sea creatures`);
    }
}

module.exports = new DolphinCommand()