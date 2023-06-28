const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');



module.exports = {
    CMD: new SlashCommandBuilder()
        .setName('create-embed')
        .setDescription('Customize an embed.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('title')
                .setDescription('*Set the title text for the embed.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('*Set the description text for the embed.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription('*Enter a 6-digit hex code for the embed color.')
                .setRequired(true)
                .setMaxLength(6)
        )
        .addStringOption(option =>
            option.setName('image')
                .setDescription('Paste an image URL. (big picture at bottom)')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('thumbnail')
                .setDescription('Paste an image URL. (small picture at top right)')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('field-name')
                .setDescription('Set the field name for the embed.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('field-value')
                .setDescription('Set the field value for the embed.')
                .setRequired(false)
        )
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('Upload a file with the embed. (shows above the embed)')
                .setRequired(false)
        ),
    async execute(client, interaction) {
        const { options } = interaction;

        const title = options.getString('title');
        const description = options.getString('description');
        const color = options.getString('color');
        const image = options.getString('image');
        const thumbnail = options.getString('thumbnail');
        const fieldn = options.getString('field-name') || "** **";
        const fieldv = options.getString('field-value') || " ";
        const file = options.getAttachment('file')

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(`0x${color}`)
            .setImage(image)
            .setThumbnail(thumbnail)
            .setTimestamp()
            .addFields(
                { name: `${fieldn}`, value: `${fieldv}` }
            )
            .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
     
              interaction.channel.send({ embeds: [embed]});
        await interaction.reply({content: `embed enviado correctamente `});
    },
};