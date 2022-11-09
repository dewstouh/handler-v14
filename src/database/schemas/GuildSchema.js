const {Schema, model} = require('mongoose');

const GuildSchema = new Schema({
    guildID: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    language: {
        type: String,
        default: process.env.LANGUAGE
    },
})

module.exports = model("ConfigServer", GuildSchema);

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/