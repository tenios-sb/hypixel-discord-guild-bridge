const { getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class PepperCommand extends BaseCommand {

    constructor() {
        super('peppers');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const peppers = playerProfile.reaper_peppers_eaten || 0;

        return this.sendReply(`${username} ate ${peppers}/5 reaper peppers`);
    }
}

module.exports = new PepperCommand()