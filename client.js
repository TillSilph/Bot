const Discord = require('discord.js'),
    fs = require('fs'),
    config = require('./config.json');
config.cfg.intents = new Discord.Intents(config.cfg.intents);

const bot = new Discord.Client(config.cfg);
bot.login(config.token);

require('./events')(bot);

bot.commands = new Discord.Collection();
bot.commands.any = [];

const DiscordDB = require('simple-discord.db');
bot.Memory = new DiscordDB("Memory", bot);


bot.db = require('quick.db');

bot.clans = new bot.db.table('Clans')

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    const comand = require(`./commands/${file}`);
    comand.names.forEach(el => {
        bot.commands.set(el, comand);
    });
    bot.commands.any.push(comand);
}


bot.createGuild = (guild = {id: "!", name: "!"}) => {
    return {
        id: guild.id,
        name: guild.name,
        muted: [],
        prefix: "l/",
        members: {},
        warns: 0,
        pvRooms:[]
    };
};
bot.createUser = (user = {id: "!", username: "!"}) => {
    return {
        id: user.id,
        name: user.username,
        notes: []
    };
};
bot.createMember = (member = {id: "!", user: {username:"!"}, guild: {id: "!"}}) => {
    return {
        id: member.id,
        name: member.user.username,
        guildId: member.guild.id,
        messageCount:0,
        balance:0
    };
};
(async function () {
    await bot.Memory.create();
    bot.Memory.setAutoStart(true);
    bot.Memory.setBackUp(1000*60*60*4);
    bot.Memory.setAutoSave(1000*60*60);
    bot.Memory.setGuilds(bot.createGuild);
    bot.Memory.setUsers(bot.createUser);
    bot.Memory.setMembers(bot.createMember);
    bot.Memory.save();
}());