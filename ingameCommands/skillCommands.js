const BaseCommand = require('./baseCommand.js')
const { getSkillLevel } = require("../helper/skills");
const { getPlayer, addCommas } = require('../helper/functions.js');

class SkillCommands extends BaseCommand {

    constructor(skill) {
        super(skill);
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const xp = playerProfile?.[`experience_skill_${this.name}`] || -1;
        if (xp < 0) {
            return this.sendReply(`${username} did not enable skill API`)
        }
        const level = getSkillLevel(xp, { skill: this.name, decimals: 2 });
        return this.sendReply(`${username} is ${this.name} ${level} with ${addCommas(xp.toFixed())} ${this.name} xp`)
    }
}

class SocialCommand extends BaseCommand {

    constructor() {
        super('social')
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);

        const xp = Object.values(searchedPlayer.profileData?.members || {}).reduce((prev, p) => prev + (p?.experience_skill_social2 || 0), 0);

        const level = getSkillLevel(xp, { skill: "social", decimals: 2 });
        return this.sendReply(`${username} is social ${level} with ${addCommas(xp.toFixed())} social xp`)
    }
}

class FarmingCommand extends BaseCommand {

    constructor() {
        super('farming');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const xp = playerProfile?.experience_skill_farming || -1;
        if (xp < 0) {
            return this.sendReply(`${username} did not enable skill API`)
        }
        const manualCap = playerProfile?.memberData?.jacob2?.perks?.farming_level_cap > -1 ? 50 + playerProfile?.memberData?.jacob2?.perks?.farming_level_cap : 50;
        const level = getSkillLevel(xp, { skill: "farming", decimals: 2, manualCap: manualCap });
        return this.sendReply(`${username} is farming ${level} with ${addCommas(xp.toFixed())} farming xp`)
    }
}


module.exports = [
    new SkillCommands('enchanting'),
    new SkillCommands('alchemy'),
    new SkillCommands('taming'),
    new SkillCommands('fishing'),
    new SkillCommands('mining'),
    new SkillCommands('combat'),
    new SkillCommands('foraging'),
    new SkillCommands('carpentry'),
    new SkillCommands('runecrafting'),
    new SocialCommand(),
    new FarmingCommand()
]