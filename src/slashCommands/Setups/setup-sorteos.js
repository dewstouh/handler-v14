const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);
  const ms = require("ms");
  
  module.exports = {
    CMD: new SlashCommandBuilder()
      .setName("sorteo-panel")
      .setDescription("Creare un sistema de sorteo")
      .addStringOption(option => option.setName('premio').setDescription('Elije un premio para el sorteo').setRequired(true)
      )
      .addStringOption(option => option.setName('descripcion').setDescription('Elije una descripcion para el sorteo').setRequired(true)
      )
      .addStringOption(option => option.setName('tiempo').setDescription('Elije un tiempo para el sorteo').addChoices(
                  { name: '30 Segundos', value: '30s' },
                  { name: '1 Minutos', value: '1m' },
                  { name: '5 Minutos', value: '5m' },
          { name: '10 Minutos', value: '10m' },
          { name: '15 Minutos', value: '15m' },
          { name: '30 Minutos', value: '30m' },
          { name: '45 Minutos', value: '45m' },
          { name: '1 Hora', value: '1h' },
          { name: '2 Horas', value: '2h' },
          { name: '5 Horas', value: '5h' },
          { name: '12 Horas', value: '12h' },
          { name: '1 Dia', value: '24h' },
          { name: '3 Dias', value: '72h' },
          { name: '1 Semana', value: '168h' },
              ).setRequired(true))
        .addChannelOption(option => option.setName('canal').setDescription('Elije un canal para enviar el sorteo').setRequired(true))
        .addRoleOption(option => option.setName('rol').setDescription('Elije un rol para mencionar').setRequired(true)),
  
    async execute(client, interaction) {
  
      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrador)) {
  
        interaction.reply({ content: `No tienes permisos para este comando.`, ephemeral: true })
  
      } else {
        let premio = interaction.options.getString("premio");
        let tempo = interaction.options.getString("tiempo");
        let desc = interaction.options.getString("descripcion");
        let canal = interaction.options.getChannel("canal");
        let rol = interaction.options.getRole("rol");
        
        let duracao = ms(tempo);
  
        let button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("botao")
            .setEmoji("🎉")
            .setLabel('Participar')
            .setStyle(Discord.ButtonStyle.Secondary)
        );
  
        let click = [];
  
        let embed = new Discord.EmbedBuilder()
          .setTitle(`🎉 **SORTEO** | ${interaction.guild.name}`)
          .setDescription(`> Creado por: ${interaction.user}.
  > Descripcion: **${desc}**
  
  > Premio: **${premio}**
  
  > Rol Mencionado: ${rol}
  
  > Tiempo: \`${tempo}\`.
  Clickea el boton para participar.\n**Buena Suerte!!!**`)
          .setTimestamp(Date.now() + ms(tempo))
          .setFooter({ text: "Data del sorteo:" })
          .setColor("White");
  
        let erro = new Discord.EmbedBuilder()
          .setColor("White")
          .setDescription(`No se puede promocionar un sorteo!`);
  
        await interaction.reply({ content: `El sorteo se envio al canal: <#${canal.id}>`, ephemeral: true })
        const msg = await canal.send({ embeds: [embed], components: [button] }).catch((e) => {
            interaction.reply({ embeds: [erro], ephemeral: true });
          });
  
        const coletor = msg.createMessageComponentCollector({
          time: ms(tempo),
        });
  
        coletor.on("end", (i) => {
          interaction.editReply({ components: [
              new Discord.ActionRowBuilder().addComponents(
                  new Discord.ButtonBuilder()
                    .setDisabled(true)
                    .setCustomId("botao")
                    .setLabel('Participar')
                    .setEmoji("🎉")
                    .setStyle(Discord.ButtonStyle.Secondary)
                )
            ] });
        });
  
        coletor.on("collect", (i) => {
  
          if (i.customId === "botao") {
  
            if (click.includes(i.user.id)) return i.reply({ content: `Ya estas participando en el sorteo.`, ephemeral: true });
  
            click.push(i.user.id);
  
            interaction.editReply({ embeds: [embed] });
  
            i.reply({ content: `Entraste en el sorteo.`, ephemeral: true });
          }
  
        });
  
        setTimeout(() => {
          let ganhador = click[Math.floor(Math.random() * click.length)];
  
          if (click.length == 0) return interaction.followUp(`\n**SORTEO CANCELADO!**\nNingun participante entro al sorteo de: \`${premio}\`.`);
  
          interaction.followUp(`**Felicitaciones <@${ganhador}> has ganado: \`${premio}\`.**`);
  
        }, duracao);
      }
  
    },
  };