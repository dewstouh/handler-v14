const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const marriageSchema = require('../../database/schemas/marrageSchema')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName("marry")
    .setDescription("Casarse con un usuario!")
    .addUserOption(option => option.setName("usuario").setDescription("El usuario con el que quieres casarte!").setRequired(true)),
    async execute(client, interaction) {
       
        const user1 = interaction.user.id;
        const user2 = interaction.options.getUser("usuario").id;
      
        const existingMarriage = await marriageSchema.findOne({ user2 });
        const married = await marriageSchema.findOne({ user1 })
        if (existingMarriage) {
          return interaction.reply("Ya estás casado con este usuario!");
        } else if (married) {
            return interaction.reply('Ya estas casado con otra persona!')
        }
      
    
        const newMarriage = new marriageSchema({ user1, user2 });
        await newMarriage.save();
      
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('accept')
              .setLabel('Aceptar')
              .setStyle('Success'),
            new ButtonBuilder()
              .setCustomId('deny')
              .setLabel('Rechazar')
              .setStyle('Danger')
          );
      
        const marriageEmbed = new EmbedBuilder()
          .setTitle('Solicitud de matrimonio')
          .setDescription(`<@${interaction.user.id}> quiere casarse contigo <@${interaction.options.getUser("usuario").id}>`);
      
         await interaction.reply({ embeds: [marriageEmbed], components: [row] });
      
        const filter = i => i.user.id === user2;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
      
        collector.on('collect', async i => {
          if (i.customId === 'accept') {
            
            await marriageSchema.findOneAndUpdate({ user1, user2 }, { accepted: true });
            const acceptedEmbed = new EmbedBuilder()
              .setColor("Fuchsia")
              .setTitle('**> ❤ Matrimonio Aceptado**')
              .setDescription(`<@${user2}> ha aceptado su solicitud de matrimonio! Felicidades!💌`)
              .setImage("https://media.tenor.com/UnSlrdcbV9kAAAAC/anime-ring.gif");
            await i.reply({ embeds: [acceptedEmbed]});
          } else if (i.customId === 'deny') {
            
            await marriageSchema.findOneAndDelete({ user1, user2 });
            const deniedEmbed = new EmbedBuilder()
              .setTitle('**> 💔 Matrimonio Rechazado**')
              .setColor("Red")
              .setDescription(`<@${user2}> ha denegado su solicitud de matrimonio💔`);
            await i.reply({ embeds: [deniedEmbed]});
          }
        });
      
        collector.on('end', collected => {
          if (collected.size === 0) {
            
            marriageSchema.findOneAndDelete({ user1, user2 });
            const timeoutEmbed = new EmbedBuilder()
              .setTitle('**> ⏰ Solicitud de matrimonio agotada**')
              .setDescription(`<@${user2}> no respondió a su solicitud de matrimonio a tiempo⏲`);
            interaction.editReply({ embeds: [timeoutEmbed], components: [] });
          }
        });
      }
    }      
  