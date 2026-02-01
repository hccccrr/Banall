const { isAdmin, isBotAdmin } = require('./helpers');

module.exports = (bot) => {

    bot.command('kickall', async (ctx) => {
        if (ctx.chat.type === 'private') return;
        if (!await isAdmin(ctx)) return;
        if (!await isBotAdmin(ctx)) return;

        ctx.reply(
`⚠️ KICK ALL MEMBERS

All non-admin members
will be removed.

Confirm to continue:`,
        {
            reply_markup: {
                inline_keyboard: [[
                    { text: '🔥 CONFIRM KICKALL', callback_data: 'kickall_yes' },
                    { text: '❌ CANCEL', callback_data: 'kickall_no' }
                ]]
            }
        });
    });

    bot.on('callback_query', async (ctx) => {
        if (!ctx.callbackQuery.data.startsWith('kickall')) return;

        if (!await isAdmin(ctx))
            return ctx.answerCbQuery('Admin only', { show_alert: true });

        const chatId = ctx.chat.id;

        if (ctx.callbackQuery.data === 'kickall_no') {
            await ctx.editMessageText('❌ Kickall cancelled');
            return ctx.answerCbQuery();
        }

        await ctx.editMessageText('🚨 Kicking members...');

        ctx.answerCbQuery('Processing...');

        // ⚠️ Telegram does NOT give full member list
        // We kick recent message senders instead

        bot.on('message', async (msgCtx) => {
            if (msgCtx.chat.id !== chatId) return;

            const m = await msgCtx.telegram.getChatMember(chatId, msgCtx.from.id);
            if (['administrator', 'creator'].includes(m.status)) return;

            try {
                await msgCtx.telegram.kickChatMember(chatId, msgCtx.from.id);
            } catch {}
        });
    });
};
