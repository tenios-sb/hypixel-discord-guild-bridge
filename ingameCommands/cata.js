const BaseCommand = require('./baseCommand.js');
const {getCataLevel} = require("../helper/skills");
const { addCommas, getPlayer } = require('../helper/functions.js');

class CataCommand extends BaseCommand {

    constructor() {
        super('cata');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const xp = playerProfile?.dungeons?.dungeon_types?.catacombs?.experience || 0;
        const level = getCataLevel(xp, {decimals :2});
        return this.sendReply(`${username} is cata ${level} with ${addCommas(xp.toFixed())} cata xp`);
    }
}

module.exports = new CataCommand();