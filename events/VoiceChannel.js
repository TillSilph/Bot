module.exports = async (o, n, bot) => {
    if(n.member.user.bot) return
    if(o.member.user.bot) return

    if(n.guild) {
        if(!bot.Memory.guilds.get(n.guild.id)) bot.Memory.guilds.add(n.guild);
        const memGuild = bot.Memory.guilds.get(n.guild.id,false);
        if(!memGuild.members.get(n.id)&&n.member) memGuild.members.add(n.member);
        if(!bot.Memory.users.get(n.id)&&n.member) bot.Memory.users.add(n.member);
	  }

    
}