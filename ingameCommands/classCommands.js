const BaseCommand = require('./baseCommand.js');
const { getCataLevel } = require("../helper/skills");
const { addCommas, getPlayer } = require('../helper/functions.js');

class ClassCommands extends BaseCommand {

    constructor(dungeonClass) {
        super(dungeonClass);
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const xp = playerProfile?.dungeons?.player_classes[this.name]?.experience || 0;
        const level = getCataLevel(xp, { decimals: 2 });
        return this.sendReply(`${username} is ${this.name} ${level} with ${addCommas(xp, 0)} ${this.name} xp`)
    }
}

module.exports = [
    new ClassCommands('healer'),
    new ClassCommands('tank'),
    new ClassCommands('mage'),
    new ClassCommands('archer'),
    new ClassCommands('berserk')
];