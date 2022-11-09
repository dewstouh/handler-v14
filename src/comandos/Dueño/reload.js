const { EmbedBuilder } = require('discord.js');
module.exports = {
    DESCRIPTION: "Recarga los archivos del bot.",
    OWNER: true,
    async execute(client, message, args, prefix, GUILD_DATA) {

        let opcion = "Comandos, Eventos y Handlers";

        try {
            switch (args[0]?.toLowerCase()) {
                case "comands":
                case "comandos": {
                    opcion = "Comandos"
                    await client.loadCommands();
                }
                    break;

                case "slash":
                case "slashcommands": {
                    opcion = "Comandos Slash"
                    await client.loadSlashCommands();

                }
                    break;

                case "eventos":
                case "events": {
                    opcion = "Eventos"
                    await client.loadEvents();
                }
                    break;

                case "handlers":{
                    opcion = "Handlers"
                    await client.loadHandlers();
                }
                    break;

                default:{
                    await client.loadEvents();
                    await client.loadHandlers();
                    await client.loadSlashCommands();
                    await client.loadCommands();
                }
                    break;
            }

            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields([
                        {name: `✅ ${opcion} Recargados`, value: `> *Okay!*`}
                    ])
                    .setColor(process.env.COLOR)
                ]
            });
        } catch (e) {
            message.reply(`**Ha ocurrido un error a al recargar el bot!**\n*Mira la consola para más detalles.*`);
            console.log(e);
            return;
        }
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/