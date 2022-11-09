module.exports = (client) => {
    process.removeAllListeners();

    process.on('unhandledRejection', (reason, p) => {
        console.log(' [ANTICRASH] - unhandledRejection'.grey);
        console.log(reason, p + "".grey);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: uncaughtException'.grey);
        console.log(err, origin + "".grey);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: uncaughtExceptionMonitor'.grey);
        console.log(err, origin+ "".grey);
    });
    process.on('multipleResolves', () => {

    });
    process.on('SIGINT', () => process.exit());
    process.on('SIGUSR1', () => process.exit());
    process.on('SIGUSR2', () => process.exit());
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/