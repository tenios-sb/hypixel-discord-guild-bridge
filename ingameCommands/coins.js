const { getPlayer, numberformatter } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class CoinsCommand extends BaseCommand {

    constructor() {
        super('coins');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;
        const purse = playerProfile?.coin_purse || 0;
        const bank = playerProfile?.banking?.balance || 0
        this.sendReply(`${username} has ${numberformatter(purse + bank, 3)} coins ` +
            (bank ? `(${numberformatter(purse, 3)} purse / ${numberformatter(bank, 3)} bank)` : 'in their purse'))
    }
}

module.exports = new CoinsCommand();