const { addCommas, getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class WatcherCommand extends BaseCommand {

    constructor() {
        super('watcher');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const normal = playerProfile?.stats?.kills_watcher_summon_undead || 0;
        const master = playerProfile?.stats?.kills_master_watcher_summon_undead || 0;
        const total = normal + master;

        const distribution = total ? `(${parseInt(master / total * 100)}% mastermode)`: '';

        return this.sendReply(`${username} killed a total of ${addCommas(total)} blood mobs ${distribution}`);
    }
}

module.exports = new WatcherCommand();