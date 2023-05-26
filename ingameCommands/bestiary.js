const { getPlayer } = require('../helper/functions.js');
const BaseCommand = require('./baseCommand.js');

const island_mobs = ["cave_spider", "enderman_private", "skeleton", "slime", "spider", "witch", "zombie"];
const normal_mobs = ["old_wolf", "unburried_zombie", "ruin_wolf", "zombie_villager",
    "arachne_brood", "arachne_keeper", "dasher_spider", "respawning_skeleton", "random_slime", "spider_jockey", "splitter_spider", "voracious_spider", "weaver_spider",
    "enderman", "endermite", "obsidian_wither", "voidling_extremist", "voidling_fanatic", "watcher", "zealot_enderman",
    "blaze", "flaming_spider", "ghast", "magma_cube", "matcho", "charging_mushroom_cow", "pigman", "wither_skeleton", "wither_spectre",
    "automaton", "butterfly", "emerald_slime", "caverns_ghost", "goblin", "team_treasurite", "ice_walker", "lapis_zombie", "diamond_skeleton",
    "diamond_zombie", "redstone_pigman", "sludge", "invisible_creeper", "thyst", "treasure_hoarder", "worms", "yog",
    "howling_spirit", "pack_spirit", "soul_of_the_alpha",
    "batty_witch", "phantom_spirit", "scary_jerry", "trick_or_treater", "wither_gourd", "wraith",
    "diamond_guy", "cellar_spider", "crypt_dreadlord", "crypt_lurker", "crypt_souleater", "king_midas", "lonely_spider", "lost_adventurer", "scared_skeleton", "shadow_assassin",
    "skeleton_grunt", "skeleton_master", "skeleton_soldier", "skeletor", "sniper_skeleton", "super_archer", "super_tank_zombie", "crypt_tank_zombie", "watcher_summon_undead",
    "dungeon_respawning_skeleton", "crypt_witherskeleton", "zombie_commander", "zombie_grunt", "zombie_knight", "zombie_soldier"
]
const boss_mobs = ["arachne", "brood_mother_spider", "dragon", "corrupted_protector", "ashfang", "barbarian_duke_x", "bladesoul", "mage_outlaw", "magma_boss", "headless_horseman"]

const normalKills = [10, 15, 75, 150, 250, 500, 1500, 2500, 5000, 15000, 25000, 50000]
const bossKills = [2, 3, 5, 10, 10, 10, 10, 25, 25, 50, 50]

const getBestiaryLevel = (kills, boss, privateIsland) => {
    let amount = kills ?? 0;
    let table = boss ? bossKills : normalKills
    let level = 0;
    for (let kill of table) {
        if (amount >= kill) {
            amount -= kill;
            level++;
        } else {
            break;
        }
    }
    let further = boss ? 100 : 100000;
    level += parseInt(amount / further);
    level = Math.min(41, level);
    return privateIsland ? Math.min(5, level) : level;
}

class BestiaryCommand extends BaseCommand {

    constructor() {
        super('bestiary');
    }

    execute = async (message, messageAuthor) => {
        let { username, profile } = this.getArgs(message, messageAuthor);

        const searchedPlayer = await getPlayer(username, profile);
        const playerProfile = searchedPlayer.memberData;

        let bestiary = 0;

        bestiary += island_mobs.reduce((prev, id) => prev + getBestiaryLevel(playerProfile?.bestiary?.[`kills_family_${id}`] || 0, false, true), 0);
        bestiary += normal_mobs.reduce((prev, id) => prev + getBestiaryLevel(playerProfile?.bestiary?.[`kills_family_${id}`] || 0, false, false), 0);
        bestiary += boss_mobs.reduce((prev, id) => prev + getBestiaryLevel(playerProfile?.bestiary?.[`kills_family_${id}`] || 0, true, false), 0);

        return this.sendReply(`${username} is bestiary level ${bestiary / 10}`);
    }
}

module.exports = new BestiaryCommand();