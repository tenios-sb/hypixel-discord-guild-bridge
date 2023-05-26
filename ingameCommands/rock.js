const { addCommas, getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class RockCommand extends BaseCommand {

    constructor() {
        super('rock');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const ores = playerProfile?.stats?.pet_milestone_ores_mined || 0;
        return this.sendReply(`${username} mines ${addCommas(ores)} ores`);
    }
}

module.exports = new RockCommand()