const anime = require('anime-actions');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('bofetear')//////////// cambiar comando
    .setDescription('bofetear a un usuario.')
    .addUserOption( option =>
      option.setName('usuario')
                  .setDescription('Usuario')
                  .setRequired(true)
      ),

    async execute(client, interaction) {

      const member = interaction.options.getUser('usuario') || interaction.user
      
      const url = await anime.slap();////////// cambiar el anime.slap por el que quieras ej: anime.kiss , anime.highfive ect todo en la pagina de anime actions
      
      const embed = new EmbedBuilder()
        .setDescription(`ยก**${interaction.user.username}** ha bofeteado a **${member.username}** sin rencor!`)///////// cambiar el texto por la accion que hace
       .setColor("DarkButNotBlack")
       .setImage(url)
      
      interaction.reply({ embeds: [embed] })
      
 }
}
/////////////////////////// se puede hacer un copy paste de este comando cambiando los textos y el comando en si para hacer otra interaccion