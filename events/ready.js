module.exports = async (bot)=>{
    console.log(bot.user.username + ' LETS GOOOOO!')

    setInterval(() => {
        bot.user.setPresence({
            activities:[{
                //syncId: '31e6f8c1ff05433c',
                name: 'l/help',
                type: 1
            }]
        })
    }, 1000*60*60)
    setInterval(async () => {
        for (const guild of bot.Memory.guilds.get()) {
            const cacheGuild = guild.cache;
            for (const it of guild.muted) {
                if(it.time+it.date<Date.now()) {
                    const user = await cacheGuild.members.fetch(it.id);
                    if(!user) break;
                    user.roles.remove("911636933791334440");
                    if(user.voice.channel) user.voice.setMute(false);
                    guild.muted.splice(guild.muted.indexOf(it),1);
                }
            }
        }
    }, 5000);


	const commandsIT = bot.guilds.cache.get("940199518660608000").commands; //Или bot.application.commands - если команды будут глобальными
    await commandsIT.fetch(); //Найти все команды

	for (const command of bot.commands.any) {
        if(command.interaction) { //Если слэш команда есть
            const interaction = await commandsIT.cache.find(com=>com.name == command.interaction.name); //Найти команду в боте по названию
            if(!interaction) { //Если команда не была найдена в боте
                commandsIT.create(command.interaction); //Создать команду
            } else  //Если команда есть
            if(JSON.stringify(interaction.options) !== JSON.stringify(command.interaction.options)) {//И параметры команды не совпадают (т.е. команда была изменена)
                interaction.edit(command.interaction); //Редактируем эту команду
            }
        }
    }
}



