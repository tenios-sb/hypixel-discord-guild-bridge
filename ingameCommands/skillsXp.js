const BaseCommand = require('./baseCommand.js');
const { getPlayer, addCommas, numberformatter } = require('../helper/functions.js');

class SkillsXpCommand extends BaseCommand {

    constructor() {
        super('skillxp');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        let skills = ['mining', 'taming', 'enchanting', 'alchemy', 'combat', 'foraging', 'fishing', 'farming', 'carpentry'];
        let cosmetics = ['social2', 'runecrafting'];

        if (!('experience_skill_foraging' in playerProfile))
            return this.sendReply(`${username} did not enable skill API`)

        skills = skills.map(id => playerProfile?.[`experience_skill_${id}`] || 0);
        cosmetics = cosmetics.map(id => playerProfile?.[`experience_skill_${id}`] || 0);

        const totalSkillXp = skills.reduce((prev, xp) => prev + xp, 0);
        const cosmeticSkillXp = cosmetics.reduce((prev, xp) => prev + xp, 0);

        return this.sendReply(`${username} has ${numberformatter(totalSkillXp.toFixed(), 3)} total skill xp (+${addCommas(cosmeticSkillXp.toFixed())} cosmetic skill xp)`)
    }
}

module.exports = new SkillsXpCommand()