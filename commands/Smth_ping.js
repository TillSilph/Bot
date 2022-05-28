module.exports = async (bot,message,args,argsF) => {
    message.channel.send({
        embeds: [{
            color: bot.color,
            title: `**Использование ресурсов:**`,
            description: ` Задержка: ${Math.round(bot.ws.ping)}ms`
        }]
    })
};
module.exports.names = ["ping", "пинг"];
