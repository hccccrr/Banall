async function isAdmin(ctx) {
    try {
        const m = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
        return ['creator', 'administrator'].includes(m.status);
    } catch {
        return false;
    }
}

async function isBotAdmin(ctx) {
    try {
        const m = await ctx.telegram.getChatMember(ctx.chat.id, ctx.botInfo.id);
        return ['creator', 'administrator'].includes(m.status);
    } catch {
        return false;
    }
}

module.exports = { isAdmin, isBotAdmin };
