require("dotenv").config()
const { DataBase } = require("./../db/dataBase.class");
const TelegramApi = require("node-telegram-bot-api")

class TelegramBotManager extends DataBase {
  constructor () {
    super()
    this.setAllUsers()
    this.BOT.on("message", (message) => {
      const { text, from: { id: fromId }, chat: { id: chatId } } = message
      this.BOT.sendMessage(chatId, JSON.stringify(this.allUsers))
    })
  }

  BOT = new TelegramApi(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
  allUsers = null

  async setAllUsers() {
    const [ users ] = await this.getAllUsers()
    this.allUsers = users
  }
}

new TelegramBotManager()
