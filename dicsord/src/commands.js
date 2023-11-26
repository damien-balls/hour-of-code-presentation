require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

console.log('lkill myself');

const commands = [
    {
        name: 'hey',
        description: 'hey',
    },
    {
        name: 'initialize',
        description: 'initialize practice round'
    },
    {
        name: 'play',
        description: 'play song'
    },
    {
        name: 'fact-short',
        description: 'give shoft fact'
    },
    {
        name: 'fact-long',
        description: 'long fact'
    },
    {
        name: 'webcrawl',
        description: 'webcrawl for a kewyrod'
    }/*,
    {
        name: 'help',
        descrption: 'a'
    },
    {
        name: 'query',
        descrption: 'ask a query'
    },
    {
        name: 'slur',
        descrption: 'whta'
    }*/
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('refisgisnt fcommands');
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD),
            { body: commands }
        );
        console.log('scucess');
    }
    catch (error) {
        console.log('error: ' + error);
    }
})();