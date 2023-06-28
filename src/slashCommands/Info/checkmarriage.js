const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const marriageSchema = require('../../database/schemas/marrageSchema')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName("checkmarriage")
    .setDescription("Comprueba con quién estás casado!"),
  async execute(client, interaction) {
    
    const authorId = interaction.user.id;

    
    const existingMarriage = await marriageSchema.findOne({ $or: [{ user1: authorId }, { user2: authorId }] });
    if (!existingMarriage) {
      return interaction.reply("**No estas casado con nadie!**\n Ejecuta: /marry para casate con una persona");
    }

    
    const spouseId = existingMarriage.user1 === authorId ? existingMarriage.user2 : existingMarriage.user1;

    const spouseUser = await interaction.client.users.fetch(spouseId);

    
    const marriageEmbed = new EmbedBuilder()
      .setColor("Fuchsia")
      .setTitle("**❤ Tu matrimonio**")
      .setImage("https://media.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif")
      .setTimestamp()
      .setDescription(`> ❤ Estas casado con **${spouseUser.username}**!`);
      
    await interaction.reply({ embeds: [marriageEmbed] });
  }
};