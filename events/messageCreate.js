module.exports = async (bot, message) => {
    if(message.author.bot) return;
    const {content, author, guild} = message
    const MemoryUser = bot.Memory.guilds.get(guild.id).members.get(author.id)
    MemoryUser.messageCount += 1
    if(MemoryUser.messageCount % 100 === 0){
        const num = MemoryUser.messageCount.toString()
        MemoryUser.balance += num[0]*10
    }
    if(!bot.Memory.guilds.get(guild.id)) return;
    if(content.slice(0, bot.Memory.guilds.get(guild.id).prefix.length) !== bot.Memory.guilds.get(guild.id).prefix) return;



    const
        messageArray = content.split(' '),
        command = messageArray[0].replace(bot.Memory.guilds[guild.id].prefix, ""),
        args = messageArray.slice(1),
        messageArrayFull = content.split(' '),
        argsF = messageArrayFull.slice(1),
        commandRun = bot.commands.get(command);

    if(commandRun) commandRun(bot,message,args,argsF)
        //.then(any => console.log(any))
        .catch(err => console.error(err));

};