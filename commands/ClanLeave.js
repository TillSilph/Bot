module.exports = async (bot, message)=>{
    const member = message.member
    let clanRole, mClan
    for(let clan of bot.clans.all()){
        if(member.roles.cache.has(clan.ID)){
            clanRole = message.guild.roles.cache.get(clan.ID)
            mClan = clan.ID
        }
    }
    if(!clanRole){
        return message.reply({ephemeral: true, content: "Ты не состоишь в клане"})
    }
    const owner = message.guild.members.cache.get(bot.clans.get(`${mClan}.ownerID`))
    await member.roles.remove(clanRole)
    bot.clans.subtract(`${mClan}.members`, 1)
    message.reply({ephemeral: true, content: "Вы покинули клан"})
    owner.send(`${message.author} покинул ваш клан`)
}
module.exports.names = ["cleave"]
