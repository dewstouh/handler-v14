const { EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setName('role')
        .setDescription('Agrega(true) o Quita(false) un rol a los miembros o bots del servidor')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Asigna un rol a todos los miembros del servidor')
                .addRoleOption(option => option.setName('role').setDescription('El rol que se asignará').setRequired(true))
                .addBooleanOption(option => option.setName('agregar').setDescription('Para agregar(True) o quitar(False) el rol especificado').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('Asigna un rol a un miembro específico')
                .addUserOption(option => option.setName('miembro').setDescription('El miembro al que se asignará el rol').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('El rol que se asignará').setRequired(true))
                
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('humans')
                .setDescription('Asigna un rol a todos los humanos del servidor')
                .addRoleOption(option => option.setName('role').setDescription('El rol que se asignará').setRequired(true))
                .addBooleanOption(option => option.setName('agregar').setDescription('Para agregar(True) o quitar(False) el rol especificado').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bots')
                .setDescription('Asigna un rol a todos los bots del servidor')
                .addRoleOption(option => option.setName('role').setDescription('El rol que se asignará').setRequired(true))
                .addBooleanOption(option => option.setName('agregar').setDescription('Para agregar(True) o quitar(False) el rol especificado').setRequired(true))
        )
        .setDefaultMemberPermissions(PermissionsBitField.Administrator)
        .setDMPermission(false),

            /**
             * 
             * @param {ChatInputCommandInteraction} interaction 
             */

    async execute(clitnt, interaction) {

        const { options, guild, client } = interaction;
        const sub = options.getSubcommand()
        const rol = options.getRole('role');
        const agregar = options.getBoolean('agregar')
        const miembro = options.getMember('miembro');

        if ( interaction.member.roles.highest.position <= rol.position || interaction.member.roles.highest.position <= rol.position ) {
            await interaction.reply(`No puedes dar un rol mas alto que tu rol mas alto o mi rol mas alto.`);
            return;
        }

        if (rol.tags && rol.tags.premiumSubscriberRole || rol.tags && rol.tags.subscriptionListingId) {
            await interaction.reply({ content: `Este rol es para los Boosters o suscriptores del servidor y no puede ser agregado o removido manualmente.` });
            return;
        }

        if (rol.tags && rol.tags.guildConnections || rol.tags && rol.tags.botId) {
            interaction.reply({ content: `Este rol pertenece a una integracion o un bot del servidor y no se puede agregar a ningun otro miembro.` });
            return;
        }

        if (rol.tags && rol.tags.guildConnections) {
            await interaction.reply({ content: `Los roles administrados por conexiones del servidor no pueden ser aregados o quitados manualmente.` });
            return;
        }

        if (rol.tags && rol.tags.availableForPurchase) {
            await interaction.reply({ content: `Este rol no esta disponible para ser agregado.` });
            return;
        }

        try {
            switch (sub) {
                case 'all':
                    try {
                        
                        if (rol.permissions.has(PermissionFlagsBits.Administrator)) {
                            await interaction.reply(`El rol seleccionado tiene permisos de **Administrador** y **NO** es recomendable agregarlo de esta manera.`); return;
                        }

                        await interaction.guild.members.fetch();
                        const members = interaction.guild.members.cache;
                        let count = 0;

                        interaction.reply(`Agregando el rol ${rol} a ${members.size} miembros`);

                        for (const [_, member] of members) {
                            if (agregar && !member.roles.cache.has(rol.id)) {
                                await member.roles.add(rol.id);
                                count++;
                            } else if (!agregar && member.roles.cache.has(rol.id)) {
                                await member.roles.remove(rol.id);
                                count++;
                            }
                        }
                        
                        if (count >= 0) {
                            const operacion = agregar ? 'agrego' : 'quito'
                            await interaction.channel.send(`Se ${operacion} correctamente el rol **${rol.name}** a **${count}** miembros`);
                        } else {
                            await interaction.channel.send('No se realizó ninguna operación en los miembros.');
                        }
                        
                        } catch (error) {
                            console.log(error)
                        }
                    break;
            
                case 'member':
                    try {
                        if (miembro.roles.cache.has(rol.id)) {
                            interaction.reply({ content: `Este miembro ya tiene el rol **${rol.name}**` })
                        } else {
                            await miembro.roles.add(rol.id);
                            await interaction.reply({ content: `Rol ${rol} agregado a ${miembro}` });
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            
                case 'humans':
                    try {

                        if (rol.permissions.has(PermissionFlagsBits.Administrator)) {
                            await interaction.reply(`El rol seleccionado tiene permisos de **Administrador** y **NO** es recomendable agregarlo de esta manera.`); return;
                        }

                        const humans = interaction.guild.members.cache.filter(member => !member.user.bot);
                        interaction.reply(`Agregando el rol ${rol} a ${humans.size} miembros`);
                        let count = 0;

                        for (const [_, human] of humans) {
                            if (agregar && !human.roles.cache.has(rol.id)) {
                                await human.roles.add(rol.id);
                                count++;
                            } else if (!agregar && human.roles.cache.has(rol.id)) {
                                await human.roles.remove(rol.id);
                                count++;
                            }
                        }

                        if (count >= 0) {
                            const operacion = agregar ? 'agrego' : 'quito'
                            await interaction.channel.send(`Se ${operacion} correctamente el rol **${rol.name}** a **${count}** miembros humanos.`);
                        } else {
                            await interaction.channel.send('No se realizó ninguna operación en los miembros humanos.');
                        }

                    } catch (error) {
                        console.log(error)
                    }
                    break
            
                case 'bots':
                    try {
                        
                        const bots = interaction.guild.members.cache.filter(member => member.user.bot);
                        interaction.reply(`Agregando el rol ${rol} a ${bots.size} miembros`);
                        let count = 0;

                        for (const [_, bot] of bots) {
                            if (agregar && !bot.guild.roles.cache.has(rol.id)) {
                                await bot.roles.add(rol.id);
                                count++;
                            } else if (!agregar && bot.guild.roles.cache.has(rol.id)) {
                                await bot.roles.remove(rol.id);
                                count++;
                            }
                        }

                        if (count >= 0) {
                            const operacion = agregar ? 'agrego' : 'quito'
                            await interaction.channel.send(`Se ${operacion} correctamente el rol **${rol.name}** a **${count}** Bots.`);
                        } else {
                            await interaction.channel.send('No se realizó ninguna operación en los Bots.');
                        }

                    } catch (error) {
                        console.log(error)
                    }
                    break

            }
        } catch (error) {
            interaction.reply({ content: `Algo salio mal y no puedo dar el rol :c` })
        }
    }
}