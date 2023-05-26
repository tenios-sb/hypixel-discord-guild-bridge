const BaseCommand = require('./baseCommand.js')
const { getSlayerLevel } = require("../helper/skills.js");
const { addCommas, getPlayer } = require('../helper/functions.js');

class SlayersCommand extends BaseCommand {

    constructor() {
        super('slayer');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile)
        const playerProfile = searchedPlayer.memberData;

        const zombieXp = playerProfile?.slayer_bosses?.zombie?.xp || 0;
        const spiderXp = playerProfile?.slayer_bosses?.spider?.xp || 0;
        const wolfXp = playerProfile?.slayer_bosses?.wolf?.xp || 0;
        const emanXp = playerProfile?.slayer_bosses?.enderman?.xp || 0;
        const blazeXp = playerProfile?.slayer_bosses?.blaze?.xp || 0;

        const totalXp = zombieXp + spiderXp + wolfXp + emanXp + blazeXp;

        const zombie = getSlayerLevel(zombieXp);
        const spider = getSlayerLevel(spiderXp);
        const wolf = getSlayerLevel(wolfXp);
        const eman = getSlayerLevel(emanXp);
        const blaze = getSlayerLevel(blazeXp);

        return this.sendReply(`${username} is slayers lvl ${zombie}${spider}${wolf} ${eman}${blaze} with ${addCommas(totalXp.toFixed())} total slayer xp`)
    }
}

module.exports = new SlayersCommand();