const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const bot = new Telegraf(config.BOT_TOKEN);

// 🔌 Plugin Loader (ULTRA SAFE)
const pluginRoot = path.join(__dirname, config.plugins.root);

fs.readdirSync(pluginRoot).forEach(file => {
    if (!file.endsWith('.js')) return;

    const pluginPath = path.join(pluginRoot, file);
    const plugin = require(pluginPath);

    if (typeof plugin === 'function') {
        plugin(bot);
        console.log(`🔌 Loaded plugin (fn): ${file}`);
    }
    else if (plugin && typeof plugin.init === 'function') {
        plugin.init(bot);
        console.log(`🔌 Loaded plugin (init): ${file}`);
    }
    else {
        console.log(`⚠️ Skipped plugin (invalid): ${file}`);
    }
});

bot.catch(err => console.error('Bot Error:', err));

bot.launch().then(() => {
    console.log('🚀 Bot Started');
});

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
