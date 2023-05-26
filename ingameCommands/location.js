const { getGuildMemberData, getPlayerStatus, getTimeString } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

class LocationCommand extends BaseCommand {

    constructor() {
        super('location');
    }

    execute = async (message, messageAuthor) => {
        let { username, } = this.getArgs(message, messageAuthor);
        const statusRespone = await getPlayerStatus(username);
        const status = statusRespone.status;

        if (status?.session?.online) {
            if (status?.session?.gameType === 'SKYBLOCK') {
                return this.sendReply(`${username} is currently ${this.findIslandName(status?.session?.mode)}`)
            } else {
                //Could not be asked to translates other modes into proper names too
                return this.sendReply(`${username} is currently in the gamemode "${status?.session?.gameType}"`)
            }
        } else {
            const searchedPlayer = await getGuildMemberData(username);
            const playerProfile = searchedPlayer.player;
            if (playerProfile?.lastLogin > playerProfile?.lastLogout) {
                return this.sendReply(`${username} is currently online but hides their location`)
            } else {
                //player is offline, figure out how long
                const offline = parseInt((Date.now() - playerProfile?.lastLogout));
                if (isNaN(offline)) {
                    return this.sendReply(`No activity information for ${username}`)
                }
                return this.sendReply(`${username} was online ${getTimeString(offline)}ago`);
            }
        }
    }

    findIslandName(internalName) {
        switch (internalName) {
            case 'hub':
                return 'in a hub';
            case 'dynamic':
                return 'on a private island';
            case 'combat_1':
                return 'in the spiders den';
            case 'combat_3':
                return 'in the end';
            case 'foraging_1':
                return 'in the park';
            case 'farming_1':
                return 'in the farming islands';
            case 'dungeon_hub':
                return 'in a dungeon hub';
            case 'dark_auction':
                return 'in a dark auction';
            case 'mining_1':
                return 'in the gold mines';
            case 'mining_2':
                return 'in the deep caverns';
            case 'mining_3':
                return 'in the dwarven mines';
            case 'dungeon':
                return 'in a dungeon';
            case 'winter':
                return 'in jerry\'s workshop';
            case 'crystal_hollows':
                return 'in the crystal hollows';
            case 'crimson_isle':
                return 'in the crimson isles';
            case 'instanced':
                return 'in a kuudra fight';
            case 'garden':
                return 'in the garden';
            default:
                return 'playing skyblock';
        }
    }

}

module.exports = new LocationCommand();