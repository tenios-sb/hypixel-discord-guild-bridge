const { getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class SoulflowCommand extends BaseCommand {

    constructor() {
        super('soulflow');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const soulflow = playerProfile?.soulflow  || 0;
        return this.sendReply(`${username} has ${soulflow} soulflow available.`);
    }
}

module.exports = new SoulflowCommand();