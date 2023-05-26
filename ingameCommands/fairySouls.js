const { getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class FairySoulsCommand extends BaseCommand {

    constructor() {
        super('fairysouls');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const souls = playerProfile?.fairy_souls_collected || 0;
        return this.sendReply(`${username} found ${souls} fairy souls`)
    }
}

module.exports = new FairySoulsCommand();