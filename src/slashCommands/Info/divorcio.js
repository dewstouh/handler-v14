const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const marriageSchema = require('../../database/schemas/marrageSchema')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName("divorce")
    .setDescription("Divorciarse de su mujer!")
    .addUserOption(option => option.setName("usuario").setDescription("El usuario que quieres Divorciar!").setRequired(true)),
  async execute(client, interaction) {

    const user1 = interaction.user.id;
    const user2 = interaction.options.getUser("usuario")?.id;


    const existingMarriage = await marriageSchema.findOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });
    if (!existingMarriage) {
      return interaction.reply("No estas casado con nadie!");
    }

    await marriageSchema.findByIdAndRemove(existingMarriage._id);

    const divorceEmbed = new EmbedBuilder()
      .setColor('Red')
      .setTitle(">  Su amor fue finalizado**")
      .setImage("https://media.tenor.com/-hppYfdFZYEAAAAC/anime-divorce.gif%22")
      .setDescription(`${user2.username}`)
      .setTimestamp();
    await interaction.reply({ embeds: [divorceEmbed] });
  }
};