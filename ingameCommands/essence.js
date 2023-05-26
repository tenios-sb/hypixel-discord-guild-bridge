const { addCommas, getPlayer, numberformatter } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class CrimsonEssenceCommand extends BaseCommand {

    constructor() {
        super('essence');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const undead = playerProfile?.essence_undead || -1;
        if (undead < 0)
            return this.sendReply(`${username} did not enable inventory API`);
        let reply = `${username} has `;
        reply += `${numberformatter(playerProfile?.essence_wither || 0)} wither, `;
        reply += `${numberformatter(undead)} undead, `;
        reply += `${numberformatter(playerProfile?.essence_gold || 0)} gold, `;
        reply += `${numberformatter(playerProfile?.essence_diamond || 0)} diamond, `;
        reply += `${numberformatter(playerProfile?.essence_spider || 0)} spider, `;
        reply += `${numberformatter(playerProfile?.essence_dragon || 0)} dragon, `;
        reply += `${numberformatter(playerProfile?.essence_ice || 0)} ice`;
        reply += ` and ${numberformatter(playerProfile?.essence_crimson || 0)} crimson essence.`;

        return this.sendReply(reply);
    }
}

module.exports = new CrimsonEssenceCommand();