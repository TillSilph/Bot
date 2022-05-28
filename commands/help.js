module.exports = async (bot,message,args,argsF) => {

    const action = {
        type: 'ACTION_ROW',
        components: [
            {
                type: 'BUTTON', //Это кнопочка
                label: 'Лево', //Это имя кнопочки
                customId: 'left', //Это ID кнопочки
                style: 'SECONDARY', //Стиль кнопочки
                disabled: false //Включена ли кнопочка
            },
            {
                type: 'BUTTON', //Это кнопочка
                label: 'Право', //Это имя кнопочки
                customId: 'right', //Это ID кнопочки
                style: 'SECONDARY', //Стиль кнопочки
                disabled: false //Включена ли кнопочка
            }
        ]
    };

    const helps = [
        {
            embeds: [
                {
                    title: "Команды пишутся через \" l/ \", без кавычек",
                    description: "**give - даст вам вашу аватарку или другого пользователя**\n**ping - просто ответ бота**\n**dec - сообщение с красивыми кнопочкам**\n **warn check @user - проверка варнов**",
                    color: "BLUE",
                    fields: [
                        {
                            name: "Рекомендация",
                            value: "Команды использовать в канале <#934627398819938364>"
                        },
                    ],
                    author: {
                        name: "Команды для пользователей",
                        icon_url: "https://i.pinimg.com/564x/10/f0/74/10f07408d7ea811c34cafbf2ab5ac14c.jpg"
                    }
                }
            ]

        },
        {
            embeds: [
                {
                    title: "Команды пишутся через \" | \", без кавычек",
                    description: "**kick @user \n   ban  @user \n   mute @user время(s \n   warn @user\n **",
                    color: 12277503,
                    author: {
                        name: "Команды для модераторов",
                        icon_url: "https://i.pinimg.com/564x/10/f0/74/10f07408d7ea811c34cafbf2ab5ac14c.jpg"
                    }
                }
            ]
        },
    ]

    for (const it of helps) it.components = [action];


    let numArg = 0;
    if(!isNaN(+args[0])) {
        numArg = +args[0];
        if(numArg<0 || numArg>helps.length-1) numArg = 0;
    }

    const msg = await message.channel.send(helps[numArg]);
    msg.num = numArg;

    const collector = await msg.createMessageComponentCollector();

    collector.on('collect', Int => {
        if(Int.user.id !== message.author.id) return Int.reply({ephemeral:true, content:"Это меню вызвали не вы"});
        if(Int.customId == "left") msg.num--;
        if(Int.customId == "right") msg.num++;

        if(msg.num<0) msg.num = helps.length-1;
        if(msg.num>helps.length-1) msg.num = 0;

        Int.update(helps[msg.num]);
    });

};
module.exports.names = ["help"];