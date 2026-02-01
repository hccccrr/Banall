const { isAdmin, isBotAdmin } = require('./helpers');

const kickAllChats = new Map();

module.exports = (bot) => {

    bot.command('kickall', async (ctx) => {
        if (ctx.chat.type === 'private') return;
        if (!await isAdmin(ctx)) return;
        if (!await isBotAdmin(ctx)) return;

        kickAllChats.set(ctx.chat.id, true);

        ctx.reply(
`🚨 KICKALL MODE ENABLED

Any NON-ADMIN who sends
a message will be kicked.

Use /stopkick to stop.`
        );
    });

    bot.command('stopkick', async (ctx) => {
        if (!await isAdmin(ctx)) return;
        kickAllChats.delete(ctx.chat.id);
        ctx.reply('✅ Kickall stopped');
    });

    bot.on('message', async (ctx, next) => {

        const chatId = ctx.chat.id;
        if (!kickAllChats.has(chatId)) return next();

        // ignore commands
        if (ctx.message?.text?.startsWith('/')) return next();

        try {
            const m = await ctx.telegram.getChatMember(chatId, ctx.from.id);
            if (['administrator', 'creator'].includes(m.status)) return next();

            await ctx.telegram.kickChatMember(chatId, ctx.from.id);
        } catch {}

        return next();
    });
};
