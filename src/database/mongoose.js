const { connect } = require('mongoose');
const GuildSchema = require('./schemas/GuildSchema');
module.exports = class Database {

    connect() {
        console.log(`Conectando a la base de datos`.yellow);

        connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log(`Conectado a la base de datos de MongoDB`.blue)
        }).catch((err) => {
            console.log(`☁ ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB`.bgRed);
            console.log(err);
        });
    }

    async getGuildData(guildID) {
        let guildData = await GuildSchema.findOne({ guildID });

        if (!guildData) {
            guildData = new GuildSchema({
                guildID
            });
            await guildData.save().catch((e) => console.log(e));
        }
        return guildData;
    }

}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/

