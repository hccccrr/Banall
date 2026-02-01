const { isAdmin, isBotAdmin } = require('./helpers');

module.exports = (bot) => {
    bot.command('banall', async (ctx) => {
        if (ctx.chat.type === 'private')
            return ctx.reply('⚠️ Group only');

        if (!await isAdmin(ctx))
            return ctx.reply('❌ Admin only');

        if (!await isBotAdmin(ctx))
            return ctx.reply('❌ I need admin rights');

        ctx.reply(
`⚠️ Mass Ban Mode Activated

Due to Telegram limits,
users will be banned when they send messages.

Use /stopban to disable.`
        );
    });
};
