const { isAdmin, isBotAdmin } = require('./helpers');

const banAllChats = new Map();

module.exports = (bot) => {

    bot.command('banall', async (ctx) => {
        if (ctx.chat.type === 'private') return;
        if (!await isAdmin(ctx)) return ctx.reply('❌ Admin only');
        if (!await isBotAdmin(ctx)) return ctx.reply('❌ I need admin');

        banAllChats.set(ctx.chat.id, true);

        ctx.reply(
`🚨 MASS BAN MODE ENABLED

👤 Any NON-ADMIN message
will cause instant BAN.

Use /stopban to disable.`
        );
    });

    bot.command('stopban', async (ctx) => {
        if (!await isAdmin(ctx)) return;

        banAllChats.delete(ctx.chat.id);
        ctx.reply('✅ Mass ban mode disabled');
    });

    // 🔥 REAL WORKING LISTENER
    bot.on('message', async (ctx, next) => {

        const chatId = ctx.chat.id;

        // banall OFF → continue normal flow
        if (!banAllChats.has(chatId)) {
            return next();
        }

        // ignore commands like /start /help etc
        if (ctx.message?.text?.startsWith('/')) {
            return next();
        }

        try {
            const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);

            if (['creator', 'administrator'].includes(member.status)) {
                return next();
            }

            await ctx.telegram.banChatMember(chatId, ctx.from.id);
            await ctx.reply(`🚫 Banned: ${ctx.from.first_name}`);
        } catch (e) {
            console.log('Ban failed:', e.message);
        }

        return next();
    });
};
