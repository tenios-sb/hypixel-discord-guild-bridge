const { addCommas, getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js')

class TrophyFishCommand extends BaseCommand {

    constructor(fish, { key, output_name } = {}) {
        super(fish);
        this.key = key || fish;
        this.output_name = output_name || fish;
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        const bronze = playerProfile?.trophy_fish[`${this.key}_bronze`] || 0;
        const silver = playerProfile?.trophy_fish[`${this.key}_silver`] || 0;
        const gold = playerProfile?.trophy_fish[`${this.key}_gold`] || 0;
        const diamond = playerProfile?.trophy_fish[`${this.key}_diamond`] || 0;
        const total = playerProfile?.trophy_fish[this.key] || 0;
        return this.sendReply(`${username} fished up ${addCommas(bronze)} bronze, ` +
            `${addCommas(silver)} silver, ${addCommas(gold)} gold ` +
            `and ${addCommas(diamond)} diamond ${this.output_name} (${addCommas(total)} total)`)
    }
}

module.exports = [
    new TrophyFishCommand('gusher', { output_name: 'gushers' }),
    new TrophyFishCommand('slugfish'),
    new TrophyFishCommand('blobfish'),
    new TrophyFishCommand('goldenfish', {
        key: 'golden_fish',
        output_name: 'golden fish'
    }),
    new TrophyFishCommand('stonefish', {
        key: 'volcanic_stonefish',
        output_name: 'volcanic stonefish'
    }),
    new TrophyFishCommand('manaray', {
        key: 'mana_ray',
        output_name: 'mana rays'
    }),
    new TrophyFishCommand('lavahorse', {
        key: 'lava_horse',
        output_name: 'lava horses'
    }),
    new TrophyFishCommand('moldfin'),
    new TrophyFishCommand('karate'),
    new TrophyFishCommand('vanille', { output_name: 'vanilles' }),
    new TrophyFishCommand('soulfish', {
        key: 'soul_fish',
        output_name: 'soul fish'
    }),
    new TrophyFishCommand('skeletonfish', {
        key: 'skeleton_fish',
        output_name: 'skeleton fish'
    }),
    new TrophyFishCommand('sulphurskitter', {
        key: 'sulphur_skitter',
        output_name: 'sulphur skitter'
    }),
    new TrophyFishCommand('flyfish'),
    new TrophyFishCommand('steaminghotflounder', {
        key: 'steaming_hot_flounder',
        output_name: 'steaming hot flounders'
    }),
    new TrophyFishCommand('obfuscated1', {
        key: 'obfuscated_fish_1',
        output_name: 'obfuscated 1'
    }),
    new TrophyFishCommand('obfuscated2', {
        key: 'obfuscated_fish_2',
        output_name: 'obfuscated 2'
    }),
    new TrophyFishCommand('obfuscated3', {
        key: 'obfuscated_fish_3',
        output_name: 'obfuscated 3'
    }),
]