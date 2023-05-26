const { getPlayer, addCommas } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class KuudraCommand extends BaseCommand {

    constructor() {
        super('kuudra');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const t1 = playerProfile?.nether_island_player_data?.kuudra_completed_tiers?.none || 0;
        const t2 = playerProfile?.nether_island_player_data?.kuudra_completed_tiers?.hot || 0;
        const t3 = playerProfile?.nether_island_player_data?.kuudra_completed_tiers?.burning || 0;
        const t4 = playerProfile?.nether_island_player_data?.kuudra_completed_tiers?.fiery || 0;
        const t5 = playerProfile?.nether_island_player_data?.kuudra_completed_tiers?.infernal || 0;

        const total = t1 + 2 * t2 + 3 * t3 + 4 * t4 + 5 * t5;

        return this.sendReply(`${username} completed ${addCommas(t1)} t1, ${addCommas(t2)} t2, ${addCommas(t3)} t3, ${addCommas(t4)} t4 and ${addCommas(t5)} t5 kuudra fights (${addCommas(total)} collection)`);
    }
}

module.exports = new KuudraCommand()