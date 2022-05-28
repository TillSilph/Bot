const { Permissions } = require('discord.js');
module.exports = async (bot, message, args) => {
    const {content, author, guild} = message
    const MemoryUser = bot.Memory.guilds.get(guild.id).members.get(author.id)
    const balance = MemoryUser.balance


    if(balance < 500) return message.reply({ephemeral: true, content:"Увы, но вам не хватает"})
    for(let clan of bot.clans.all()){
        if(message.member.roles.cache.has(clan.ID)){
            return message.reply({ephemeral: true, content:"Ты уже состоишь в клане"})
        }
    }


    message.reply("Дай название Клану")
    const filter = m => m.author.id ===  message.author.id
    await message.channel.awaitMessages({ filter, max: 1, time: 20_000, errors: ['time'] })
        .then(colmes =>{
            if(colmes.first().content.length > 80 ) {
                return colmes.first().reply("Слишком длинное название")
            }
            const cname = colmes.first().content
            const croleCheck = message.guild.roles.cache.find(role => role.name == cname);
            if(croleCheck){
                return colmes.first().reply("Увы и ах, такое название клана уже занято")
            }
            message.guild.roles.create({
                name:`${cname}`,
                mentionable:false,
            })
            setTimeout(() =>{
                const crole = message.guild.roles.cache.find(role => role.name == cname);
                const clanLead = message.guild.roles.cache.get("967876752535859300")
                crole.setPosition(16)
                message.member.roles.add(clanLead)
                message.member.roles.add(crole)
                const tChannel = message.guild.channels.create(`${cname}`, {
                    type: 'GUILD_TEXT',
                    parent: "967767821008379944",
                    permissionOverwrites: [
                        {
                            id: crole.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: message.guild.roles.everyone.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                    ]
                })
                const vChannel = message.guild.channels.create(`${cname}`, {
                    type: 'GUILD_VOICE',
                    parent: "967767821008379944",
                    permissionOverwrites: [
                        {
                            id: crole.id,
                            allow: [Permissions.FLAGS.CONNECT],
                        },
                        {
                            id: message.guild.roles.everyone.id,
                            deny: [Permissions.FLAGS.CONNECT],
                        },
                    ]
                })
                bot.clans.set(`${crole.id}`, {
                    ownerID: message.author.id,
                    name: cname,
                    tChanID: tChannel.id,
                    vChanID: vChannel.id,
                    createDate: Date.now(),

                })
            }, 1000)
            colmes.first().reply(`Поздравляю с покупкой клана`)
        })


}
module.exports.names = ["buy"]