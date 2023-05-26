const config = require('../config.json');
const { getPlayer, addCommas } = require('../helper/functions.js');
const { getSenitherWeight, getLilyWeight } = require('../helper/weight.js');
const BaseCommand = require('./baseCommand.js');

class WeightCommand extends BaseCommand {

    constructor() {
        super('weight')
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const senitherWeight = getSenitherWeight(playerProfile);
        const lilyWeight = getLilyWeight(playerProfile);

        this.sendReply(`${username} has ${addCommas((senitherWeight.total + senitherWeight.totalOverflow).toFixed()
        )} senither weight and ${addCommas(lilyWeight.total.toFixed())} lily weight.`);
    }
};

module.exports = new WeightCommand();
