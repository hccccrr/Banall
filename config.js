require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    OWNER_ID: parseInt(process.env.OWNER_ID),
    plugins: {
        root: "plugins/Banall"
    }
};
