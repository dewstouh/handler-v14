module.exports = {
    DESCRIPTION: "Mira el ping del bot",
    execute(client, message, args, prefix, GUILD_DATA){
        return message.reply(`\`${client.ws.ping}ms\``);
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/