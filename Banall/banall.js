const { isAdmin, isBotAdmin } = require('./helpers');

// 🔥 In-memory banall state
const banAllChats = new Map();

module.exports = (bot) => {

    // ENABLE BANALL
    bot.command('banall', async (ctx) => {
        if (ctx.chat.type === 'private') return;
        if (!await isAdmin(ctx)) return ctx.reply('❌ Admin only');
        if (!await isBotAdmin(ctx)) return ctx.reply('❌ I need admin');

        banAllChats.set(ctx.chat.id, true);

        ctx.reply(
`🚨 MASS BAN MODE ENABLED

👤 Any non-admin who sends a message
will be BANNED instantly.

Use /stopban to disable.`
        );
    });

    // DISABLE BANALL
    bot.command('stopban', async (ctx) => {
        if (!await isAdmin(ctx)) return;

        banAllChats.delete(ctx.chat.id);

        ctx.reply('✅ Mass ban mode disabled');
    });

    // 🔥 MESSAGE LISTENER (REAL WORKING)
    bot.on('message', async (ctx) => {
        const chatId = ctx.chat.id;

        if (!banAllChats.has(chatId)) return;
        if (!ctx.from) return;

        const userId = ctx.from.id;

        try {
            const member = await ctx.telegram.getChatMember(chatId, userId);
            if (['creator', 'administrator'].includes(member.status)) return;

            await ctx.telegram.banChatMember(chatId, userId);
            await ctx.reply(`🚫 Banned: ${ctx.from.first_name}`);
        } catch (e) {
            console.log('Ban failed:', e.message);
        }
    });
};
