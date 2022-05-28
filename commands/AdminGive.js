module.exports = async (bot, message, args) =>{

    const rolek = message.guild.roles.cache.find(role => role.id === "932342963273617448")
    const rolek2 = message.guild.roles.cache.find(role => role.id === "246996145958551554")
    const rolek3 = message.guild.roles.cache.find(role => role.id === "935754634281222204")
    if (message.member.roles.cache.has(rolek.id) || message.member.roles.cache.has(rolek2.id) || message.member.roles.cache.has(rolek3.id)){
        const mentmem = message.mentions.members.first()
        const MemoryUser = bot.Memory.guilds.get(message.guild.id).members.get(mentmem.id)

        MemoryUser.balance += args[1]
        message.reply(`${mentmem} получил ${args[1]}`)

    } else return message.reply('У вас не достаточно прав')
}
module.exports.names = ["add"]