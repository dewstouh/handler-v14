//credits to marc fino#2699
 
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
 
module.exports = {
  CMD: new SlashCommandBuilder()
    .setName("happy")
    .setDescription("😀 Para cuando estés feliz"),
 
  async execute( client, interaction) {
    const { guild } = interaction;
    const { options } = interaction;
    const urlimage = Math.floor(Math.random() * 7); // cambiar el número por los gifs que quieras que pueda mostrar el embed
    let imagen = ``;
 
    if (urlimage === 1)
      imagen = `https://media.tenor.com/F31uHngC9sIAAAAC/jibanyan-yo-kai-watch.gif`; // cambiar url por el que quieras
    else if (urlimage === 2)
      imagen = `https://media.tenor.com/k9mZGHZ-0agAAAAM/jibanyan-yo-kai-watch.gif`;
    else if (urlimage === 3)
      imagen = `https://media.tenor.com/5r44h91RvxgAAAAC/komasan-yokai-watch.gif`;
    else if (urlimage === 4) imagen = `https://i.gifer.com/HYKq.gif`;
    else if (urlimage === 5)
      imagen = `https://pa1.narvii.com/6634/f60700ae1f40fcda7f6ba3696776b056b997407a_00.gif`;
    else if (urlimage === 6)
      imagen = `https://media.tenor.com/VVBX7_NwEmoAAAAC/katie-forester-yo-kai-watch.gif`;
    else
      imagen = `https://pa1.narvii.com/6835/fe6bd6a274f85a18604b10cee3f811d52d5bf7c4_00.gif`;
 
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://static.wikia.nocookie.net/yokaiwatchwibblewobble/images/f/f2/1012a.png/revision/latest?cb=20170108230104"
        }`,
      })
      .setColor(`#a8323c`)
      .setDescription(`**${interaction.user.username}** está contento... 😄`) // cambiar el nombre de la acción
      .setImage(`${imagen}`)
      .setFooter({
        text: `Fino Bot`,
        iconURL: `https://media.discordapp.net/attachments/1089879150174666855/1092445710500245685/osfurio_1.png`,
      });
 
    interaction.reply({ embeds: [embed] });
  },
};