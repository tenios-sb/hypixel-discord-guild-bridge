const { getNetworth } = require('skyhelper-networth');
const { getPlayer, numberformatter } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class NetworthCommand extends BaseCommand {

    constructor() {
        super('networth');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);

        const networth = await getNetworth(searchedPlayer.memberData, searchedPlayer.profileData?.banking?.balance || 0, { onlyNetworth: true });

        if (networth.noInventory) {
            return this.sendReply(`${username} disabled their inventory API.`);
        }

        this.sendReply(`${username} has a networth of ${numberformatter(networth.networth.toFixed(), 3)}`);
    }
}

module.exports = new NetworthCommand();
