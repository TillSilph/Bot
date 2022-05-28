module.exports = async (bot, message, args)=>{
    const member = message.mentions.members.first()
    if(member.id === message.member.id) return message.reply({ephemeral:true, content:"Ты..."})
    const clanLead = message.guild.roles.cache.get("967876752535859300")
    let clanrole, mclan, clanroleLead
    for(let clan of bot.clans.all()){
        if(member.roles.cache.has(clan.ID)){
            clanrole = message.guild.roles.cache.get(clan.ID)
            mclan = clan.ID
        }
        if(message.member.roles.cache.has(clan.ID)){
            clanroleLead = message.guild.roles.cache.get(clan.ID)
        }
    }
    if(!clanrole){
        return message.reply({ephemeral: true, content: "Участник не состоит в клане"})
    }
    if(clanroleLead !== clanrole){
        return message.reply({ephemeral: true, content: "Участник не состоит в вашем клане"})
    }
    if(!message.member.roles.cache.has(clanLead.id)){
        return message.reply({ephemeral: true, content: "Ты не можешь этого сделать"})
    }
    member.roles.remove(clanrole)
    member.send(`Вас кикнули из клана ${bot.clans.get(`${mclan}.name`)}`)
    message.reply({ephemeral: true, content: "Участник изгнан из клана"})
}
module.exports.names = ["ckick"]
