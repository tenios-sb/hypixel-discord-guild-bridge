const config = require('../config.json');
const { getPlayer } = require('../helper/functions.js');
const { getSkillAverage } = require('../helper/skills');
const BaseCommand = require('./baseCommand.js');

class SkillCommand extends BaseCommand {

    constructor() {
        super('skills')
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile)
        const playerProfile = searchedPlayer.memberData;

        const skills = getSkillAverage(playerProfile, 2);

        if (skills == 0) {
            return this.sendReply(`${username} did not enable their skill API.`);
        }
        this.sendReply(`${username} has a skill average of ${skills}.`);
    }
}

module.exports = new SkillCommand();
