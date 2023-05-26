const BaseCommand = require('./baseCommand.js');
const { getClassAverage } = require("../helper/skills");
const { getPlayer } = require('../helper/functions.js');

class ClassAverageCommand extends BaseCommand {

    constructor() {
        super('classaverage');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const average = getClassAverage(playerProfile, 2);
        const uncappedAverage = getClassAverage(playerProfile, 2, false);
        return this.sendReply(`${username} has a dungeon class average of ${average} (${uncappedAverage})`)
    }
}

module.exports = new ClassAverageCommand();