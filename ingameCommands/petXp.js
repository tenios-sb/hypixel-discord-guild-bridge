const { numberformatter, getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class PetXpCommand extends BaseCommand {

    constructor() {
        super('petxp');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        let xp = playerProfile?.pets.reduce((prev, pet) => prev + (pet?.exp || 0), 0);

        return this.sendReply(`${username} has ${numberformatter(xp, 3)} total pet xp`);
    }
}

module.exports = new PetXpCommand()