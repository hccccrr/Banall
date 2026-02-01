const { isAdmin, isBotAdmin } = require('./helpers');

module.exports = (bot) => {

    bot.command('kickall', async (ctx) => {
        if (!await isAdmin(ctx)) return;
        if (!await isBotAdmin(ctx)) return;

        ctx.reply(
`⚠️ KICK ALL MEMBERS

This will remove all non-admin members.`,
        {
            reply_markup: {
                inline_keyboard: [[
                    { text: "👍 Confirm", callback_data: "kickall_yes" },
                    { text: "❌ Cancel", callback_data: "kickall_no" }
                ]]
            }
        });
    });

    bot.on('callback_query', async (ctx) => {
        if (!await isAdmin(ctx))
            return ctx.answerCbQuery('Admin only', { show_alert: true });

        if (ctx.callbackQuery.data === 'kickall_no') {
            await ctx.editMessageText('❌ Kickall cancelled');
            return ctx.answerCbQuery();
        }

        if (ctx.callbackQuery.data === 'kickall_yes') {
            await ctx.editMessageText('🚨 Kickall started (Telegram limits apply)');
            ctx.answerCbQuery('Processing...');
        }
    });
};
