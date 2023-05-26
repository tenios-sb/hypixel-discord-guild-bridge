const BaseCommand = require('./baseCommand.js');
const { getHotmLevel } = require("../helper/skills");
const { addCommas, getPlayer } = require('../helper/functions.js');

class HotmCommand extends BaseCommand {

    constructor() {
        super('hotm');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const xp = playerProfile?.mining_core?.experience || 0;
        const level = getHotmLevel(xp, { decimals: 2 });
        return this.sendReply(`${username} is heart of the mountain ${level} with ${addCommas(xp.toFixed())} hotm xp`);
    }
}

module.exports = new HotmCommand();