const { isAdmin, isBotAdmin } = require('./helpers');

module.exports = (bot) => {

    bot.command('banall', async (ctx) => {
        if (ctx.chat.type === 'private') return;
        if (!await isAdmin(ctx)) return ctx.reply('❌ Admin only');
        if (!await isBotAdmin(ctx)) return ctx.reply('❌ I need admin');

        global.BANALL_MODE[ctx.chat.id] = true;

        ctx.reply(
`🚨 MASS BAN MODE ENABLED

👤 Any non-admin who sends a message
will be BANNED instantly.

Use /stopban to disable.`
        );
    });

    bot.command('stopban', async (ctx) => {
        if (!await isAdmin(ctx)) return;

        delete global.BANALL_MODE[ctx.chat.id];

        ctx.reply('✅ Mass ban mode disabled');
    });

    // 🔥 MESSAGE LISTENER (REAL MAGIC)
    bot.on('message', async (ctx) => {
        const chatId = ctx.chat.id;
        if (!global.BANALL_MODE[chatId]) return;

        const userId = ctx.from.id;

        // skip admins
        const member = await ctx.telegram.getChatMember(chatId, userId);
        if (['administrator', 'creator'].includes(member.status)) return;

        try {
            await ctx.telegram.banChatMember(chatId, userId);
            await ctx.reply(`🚫 Banned: ${ctx.from.first_name}`);
        } catch (e) {
            console.log('Ban failed:', e.message);
        }
    });
};
