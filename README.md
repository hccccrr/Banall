# 🤖 Telegram Mass Action Bot (Node.js)

Advanced Telegram bot built with **Node.js** and **Telegraf** for performing mass actions in groups.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Telegraf](https://img.shields.io/badge/Telegraf-4.15-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ Features

- 🚫 **BanAll** - Ban all group members
- ✅ **UnbanAll** - Unban all banned members
- 👢 **KickAll** - Kick all members from group
- 🔇 **MuteAll** - Mute all members instantly
- 🔊 **UnmuteAll** - Unmute all members
- 📊 **Stats** - Get detailed group statistics
- 🛡️ **Admin Protection** - Automatically excludes admins
- ⚡ **Fast & Efficient** - Optimized performance
- 🎯 **Error Handling** - Robust error management

## 📋 Requirements

- Node.js 18 or higher
- Telegram Bot Token (from @BotFather)
- MongoDB (optional)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/PbxBad/Banall
cd Banall
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

```env
BOT_TOKEN=your_bot_token_here
OWNER_ID=your_telegram_user_id
MONGODB_URI=mongodb://localhost:27017/telegram-bot
BOT_USERNAME=YourBotUsername
```

### 4. Run the Bot

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## 📝 Commands

| Command | Description | Admin Only |
|---------|-------------|------------|
| `/start` | Start the bot & show welcome | No |
| `/help` | Show help message | No |
| `/stats` | Get group statistics | No |
| `/banall` | Ban all members | Yes |
| `/unbanall` | Unban all members | Yes |
| `/kickall` | Kick all members | Yes |
| `/muteall` | Mute all members | Yes |
| `/unmuteall` | Unmute all members | Yes |

## 🛠️ Installation

### Local Setup

```bash
# Clone repository
git clone https://github.com/PbxBad/Banall

# Navigate to directory
Banall

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start bot
npm start
```

### Docker Setup

```bash
# Build Docker image
docker build -t telegram-bot .

# Run container
docker run -d --env-file .env telegram-bot
```

### Heroku Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-bot-name

# Set environment variables
heroku config:set BOT_TOKEN=your_token
heroku config:set OWNER_ID=your_id

# Deploy
git push heroku main
```

## 🔧 Configuration

### Environment Variables

```env
# Required
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
OWNER_ID=123456789

# Optional
MONGODB_URI=mongodb://localhost:27017/bot
BOT_USERNAME=YourBot
LOG_LEVEL=info
```

### Permissions Required

The bot needs these admin permissions:
- ✅ Delete messages
- ✅ Ban users
- ✅ Restrict members
- ✅ Invite users

## 📚 API Documentation

### Bot Methods

```javascript
// Check if user is admin
await isAdmin(ctx)

// Check if bot is admin
await isBotAdmin(ctx)

// Ban user
await ctx.telegram.banChatMember(chatId, userId)

// Mute user
await ctx.telegram.restrictChatMember(chatId, userId, {
    can_send_messages: false
})
```

## 🎯 Use Cases

- **Group Management** - Manage large groups efficiently
- **Moderation** - Quick mass actions for raids/spam
- **Administration** - Bulk user management
- **Testing** - Test bot features in groups

## ⚠️ Important Notes

1. **Telegram Limits**: Due to API limitations, some features work differently:
   - BanAll: May require members to send messages first
   - Large groups: Pagination required for 10k+ members

2. **Permissions**: Bot must be admin with appropriate permissions

3. **Rate Limits**: Telegram enforces rate limits on mass actions

## 🔐 Security

- Never share your bot token
- Use environment variables
- Keep dependencies updated
- Validate user permissions
- Log all actions

## 🐛 Troubleshooting

### Bot not responding?
```bash
# Check if bot is running
pm2 list

# Check logs
npm run logs

# Restart bot
pm2 restart bot
```

### Permission errors?
- Ensure bot is admin
- Check bot has ban/mute permissions
- Verify user is admin

## 📊 Statistics

```
Total Users: 1000+
Active Groups: 50+
Commands Executed: 10,000+
Uptime: 99.9%
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Developer

- **Name**: BadMunda
- **Telegram**: [@BadMundaXD](https://t.me/BadMundaXD)
- **GitHub**: [@badmunda](https://github.com/PbxBad)

## 📞 Support

- **Support Group**: [@PBX_CHAT](https://t.me/PBX_CHAT)
- **Updates Channel**: [@PBX_UPDATE](https://t.me/PBX_UPDATE)

## 🙏 Credits

- [Telegraf](https://github.com/telegraf/telegraf) - Telegram bot framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- All contributors and supporters

## 📈 Roadmap

- [ ] Add database support
- [ ] Implement user warnings
- [ ] Add custom commands
- [ ] Anti-spam features
- [ ] Multi-language support
- [ ] Web dashboard
- [ ] Analytics system

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ by [BadMunda](https://github.com/PbxBad)

</div>
