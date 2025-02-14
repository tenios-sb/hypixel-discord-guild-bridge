const { getPlayer, toFixed } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class LevelCommand extends BaseCommand {

    constructor() {
        super('level');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        this.sendReply(`${username} is SkyBlock level ${Number(toFixed((playerProfile.leveling?.experience || 0) / 100, 2))}.`);
    }
}

module.exports = new LevelCommand();