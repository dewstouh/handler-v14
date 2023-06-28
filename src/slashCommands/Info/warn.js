const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setName('warnprueba')
        .setDescription('Warn a usuario')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('usuario al que le vas a dar warned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('razon')
                .setDescription('razon del warning')
                .setRequired(true)),
    async execute(client, interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            const embed = new EmbedBuilder()
            .setColor("Black")
            .setTitle("Error")
            .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const razon = interaction.options.getString('razon');

        const embed = new EmbedBuilder()
            .setTitle(`❗Warn`)
            .addFields(
                { name: " ", value: `el user **${user.tag}** fue warneado por **${interaction.user.tag}**` },
                { name: "Razon", value: `${razon}`}
            )
            .setColor('Red')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};