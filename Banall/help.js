module.exports = (bot) => {

    bot.on('callback_query', async (ctx) => {

        if (ctx.callbackQuery.data !== 'help_menu') return;

        await ctx.editMessageCaption(
`🆘 MASS ACTION BOT – HELP

🔧 Available Commands:

/banall
➤ Bans users when they send messages

/kickall
➤ Removes all non-admin members

/muteall
➤ Mutes all members in group

/unmuteall
➤ Unmutes all members

/stats
➤ Shows group statistics

━━━━━━━━━━━━━━━
⚠️ Requirements:
• Bot must be admin
• You must be admin

👨‍💻 Developer:
@BadMundaXD`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '🔙 BACK', callback_data: 'back_start' }
                        ]
                    ]
                }
            }
        );

        ctx.answerCbQuery();
    });

    bot.on('callback_query', async (ctx) => {
        if (ctx.callbackQuery.data !== 'back_start') return;

        await ctx.editMessageCaption(
`✨ WELCOME TO MASS ACTION BOT ✨

👇 Use buttons below to continue`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '➕ ADD ME', url: 'https://t.me/' + ctx.botInfo.username + '?startgroup=true' }
                        ],
                        [
                            { text: '🆘 SUPPORT', url: 'https://t.me/PBX_CHAT' },
                            { text: '📢 UPDATES', url: 'https://t.me/PBX_CHAT' }
                        ],
                        [
                            { text: '❓ HELP', callback_data: 'help_menu' }
                        ]
                    ]
                }
            }
        );

        ctx.answerCbQuery();
    });

};
