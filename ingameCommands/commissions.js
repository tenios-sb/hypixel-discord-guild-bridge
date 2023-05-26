const { addCommas, getPlayer, getGuildMemberData } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class CommissionCommand extends BaseCommand {

    constructor() {
        super('commissions');
    }

    execute = async (message, messageAuthor) => {
        let { username } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getGuildMemberData(username);
        const playerProfile = searchedPlayer.player;

        const commissions = playerProfile?.achievements?.skyblock_hard_working_miner || 0;

        return this.sendReply(`${username} completed ${addCommas(commissions)} commissions`);
    }
}

module.exports = new CommissionCommand();