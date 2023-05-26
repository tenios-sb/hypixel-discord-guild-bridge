const BaseCommand = require('./baseCommand.js');
const { getGuildMemberData, getPlayer, addCommas } = require('../helper/functions.js');

class SecretRatioCommand extends BaseCommand {

    constructor() {
        super('secretratio');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;
        const searchedPlayerData = await getGuildMemberData(username);
        const playerData = searchedPlayerData.player;

        const secrets = playerData?.achievements?.skyblock_treasure_hunter || 0;
        let completedRuns = 0;
        for (let mode in playerProfile?.dungeons?.dungeon_types) {
            for (let floor in playerProfile?.dungeons?.dungeon_types[mode]?.tier_completions) {
                completedRuns += playerProfile?.dungeons?.dungeon_types[mode]?.tier_completions[floor] || 0;
            }
        }
        let totalRuns = 0;
        for (let floor in playerProfile?.dungeons?.dungeon_types?.catacombs?.times_played) {
            totalRuns += playerProfile?.dungeons?.dungeon_types?.catacombs?.times_played[floor];
        }

        if (completedRuns === 0 && totalRuns > 0)
            return this.sendReply(`On average, ${username} found ${addCommas((secrets / totalRuns).toFixed(2))} secrets per incomplete run`)
        if (totalRuns === 0)
            return this.sendReply(`${username} found ${addCommas(secrets)} secrets, but has not started a single run on this profile `)

        return this.sendReply(`On average, ${username} found ${addCommas((secrets / completedRuns).toFixed(2))} secrets ` +
            `(${addCommas(secrets)}/${addCommas(completedRuns)}) per completed run / ${addCommas((secrets / totalRuns).toFixed(2))} overall ` +
            `(${addCommas(secrets)}/${addCommas(totalRuns)})`)
    }
}

module.exports = new SecretRatioCommand();