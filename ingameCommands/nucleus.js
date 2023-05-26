const BaseCommand = require('./baseCommand.js');
const { addCommas, getPlayer } = require('../helper/functions.js');

class NucleusCommand extends BaseCommand {

    constructor() {
        super('nucleus');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;
        //using this since the achievement tracking didn't start when the update rolled first,
        //but this does include all runs
        const runs = playerProfile?.mining_core?.crystals?.jade_crystal?.total_placed || 0;
        return this.sendReply(`${username} completed ${addCommas(runs)} nucleus runs`);
    }
}

module.exports = new NucleusCommand();