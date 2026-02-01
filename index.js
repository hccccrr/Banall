const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const bot = new Telegraf(config.BOT_TOKEN);

// 🔌 Load Plugins
const pluginRoot = path.join(__dirname, config.plugins.root);
fs.readdirSync(pluginRoot).forEach(file => {
    if (file.endsWith('.js')) {
        require(`${pluginRoot}/${file}`)(bot);
        console.log(`🔌 Loaded plugin: ${file}`);
    }
});

bot.catch(err => console.error(err));

bot.launch().then(() => {
    console.log('🚀 Bot Started');
});

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
