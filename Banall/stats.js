module.exports = (bot) => {
    bot.command('stats', async (ctx) => {
        if (ctx.chat.type === 'private')
            return ctx.reply('⚠️ Group only command');

        const count = await ctx.telegram.getChatMembersCount(ctx.chat.id);

        ctx.reply(
`📊 Group Stats
👥 Members: ${count}
📱 Group: ${ctx.chat.title}
🆔 ID: ${ctx.chat.id}`
        );
    });
};
