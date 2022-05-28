module.exports = async (bot, message, args)=>{
    const member = message.mentions.members.first()
    if(member === message.member) return message.reply({ephemeral:true, content:"Ты..."})
    const clanLead = message.guild.roles.cache.get("967876752535859300")
    let clanrole, mclan
    for(let clan of bot.clans.all()){
        if(message.member.roles.cache.has(clan.ID)){
            clanrole = message.guild.roles.cache.get(clan.ID)
            mclan = clan.ID

        }
    }
    if(!message.member.roles.cache.has(clanLead.id)){
        return message.reply({ephemeral: true, content: "Ты не можешь этого сделать"})
    }
    for(let clan of bot.clans.all()){
        if(member.roles.cache.has(clan.ID)){
            return message.reply({ephemeral: true, content: "Участник уже состоит в клане"})
        }
    }
    message.reply({ephemeral: true, content:"Предложение отправлено уастнику"})


    const msg = await member.send({
        embeds: [{
            title: `Вас пригласили в клан ${bot.clans.get(`${mclan}.name`)}`
        }],
        components: [{
            type:"ACTION_ROW",
            components:[
                {
                    type: 'BUTTON', //Это кнопочка
                    label: 'Прниять', //Это имя кнопочки
                    customId: 'Yep', //Это ID кнопочки
                    style: 'SECONDARY', //Стиль кнопочки
                    emoji: "✅", //Эмоджи кнопочки
                    url: null, //Ссылка кнопочки
                    disabled: false //Включена ли кнопочка
                },
                {
                    type: 'BUTTON', //Это кнопочка
                    label: 'Отклонить', //Это имя кнопочки
                    customId: 'NoYep', //Это ID кнопочки
                    style: 'SECONDARY', //Стиль кнопочки
                    emoji: "❌", //Эмоджи кнопочки
                    disabled: false //Включена ли кнопочка
                }
            ]
        }]
    });

    const collector = await msg.createMessageComponentCollector();

    collector.on('collect', interaction => {
        if(interaction.customId === "Yep"){
            msg.delete()
            interaction.reply(`Добро пожаловать в ${bot.clans.get(`${mclan}.name`)}`)
            member.roles.add(clanrole)
        }
        if(interaction.customId === "NoYep"){
            msg.delete()
            interaction.reply("Вы отказались")
            message.author.send(`${member} отказался от вступления в ваш клан`)
        }
    })
}
module.exports.names = ["cinvite"]
