const config = require('../config.json');

class BaseCommand {

    constructor(name) {
        this.name = name;
    }

    triggers(key) {
        if (this.name === key.trim())
            return true;
        if (config.ingameCommands.alias?.[this.name]?.includes(key))
            return true;
        return false;
    }

    getArgs(message, author) {
        let parts = message.substring(config.ingameCommands.trigger.length).split(' ')
        return {
            username: parts[1] || author,
            profile: parts[2]
        }
    }

    sendReply(message) {
        console.log(message)
        //minecraftClient.chat(`/gc ${message}`);
    }
}

module.exports = BaseCommand