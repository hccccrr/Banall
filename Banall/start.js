module.exports = (bot) => {
    bot.start((ctx) => {
        ctx.reply(
`🤖 Welcome to Mass Action Bot!

👋 Hey ${ctx.from.first_name}!

Commands:
/banall
/kickall
/muteall
/unmuteall
/stats

Developer: @BadMundaXD`
        );
    });
};
