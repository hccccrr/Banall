module.exports = (bot) => {
    bot.start((ctx) => {
        ctx.replyWithPhoto(
            'https://files.catbox.moe/ur59oh.png',
            {
                caption:
`✨ WELCOME TO MASS ACTION BOT ✨

👋 Hey ${ctx.from.first_name}

⚡ A powerful group moderation bot
built for mass actions.

🔒 Fast • Safe • Admin Friendly

👇 Use buttons below to continue`,
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
    });
};
