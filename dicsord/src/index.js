require('dotenv').config();
const { Client, IntentsBitField, Message } = require('discord.js');
//const { generateDependancyReport } = require('@discordjs/voice');
//explicetly diefneds perms of bot
const guy = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildIntegrations,
    ]
});

console.log('online');

guy.on('ready', (c) => {
    console.log(`${c.user.tag} is started`);
})

guy.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    else {
        console.log('message content: ' + message.content);
        if (message.content === '/balls') {
            message.reply('you love men');
        }
    }
});

guy.on('interactionCreate', (thing) => {
    console.log('interacted');
    if (thing.isChatInputCommand()) {
        console.log(thing.commandName);
        if (thing.commandName === 'hey') {
            thing.reply('no');
        }
        else if (thing.commandName === 'initialize') {
            console.log('a')
            thing.reply('no');
        }
        else if (thing.commandName === 'fact-short') {
            console.log('a')
            thing.reply('no');
        }
        else if (thing.commandName === 'fact-long') {
            console.log('a')
            thing.reply('no');
        }
        else if (thing.commandName === 'webcrawl') {
            console.log('a')
            thing.reply('no');
        }
        else if (thing.commandName === 'query') {
            console.log('a')
            thing.reply('no');
        }
        else if (thing.commandName === 'help') {
            console.log('a')
            thing.reply('no');
        }
    }
});

guy.login(process.env.TOKEN);