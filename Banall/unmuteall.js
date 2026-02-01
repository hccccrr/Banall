const { isAdmin, isBotAdmin } = require('./helpers');

module.exports = (bot) => {
    bot.command('unmuteall', async (ctx) => {
        if (!await isAdmin(ctx)) return;
        if (!await isBotAdmin(ctx)) return;

        await ctx.telegram.setChatPermissions(ctx.chat.id, {
            can_send_messages: true
        });

        ctx.reply('🔊 All members unmuted');
    });
};
