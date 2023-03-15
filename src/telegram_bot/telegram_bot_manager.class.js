require("dotenv").config()
const { DataBase } = require("../db/data_base.class");
const TelegramApi = require("node-telegram-bot-api")

class TelegramBotManager extends DataBase {
  constructor () {
    super()
    void this.setUsers()
    void this.setUpBot()
    void this.onMessage()
  }

  // TODO (developer) - why error: [polling_error] {} when user send messages if bot off?
  BOT = new TelegramApi(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
  users = null

  onMessage() {
    this.BOT.on("message", (message) => {
      const { text, from: { id: fromId }, chat: { id: chatId } } = message
      const user = this.findUser(fromId);
      if (user) {
        if (text === this.commands[0].command) { /* /see_last_operations */
          void this.sendMessage(chatId, this.messages.success)
          return
        }
        const operation = text.split(",") // insert operation
        if (operation.length === 3) {
          const { id: userId } = user
          const preparedOperation = this.prepareOperationToInsert(operation, userId)
          void this.saveOperation(preparedOperation)
          void this.sendMessage(chatId, this.messages.success)
          return
        }
        void this.sendMessage(chatId, this.messages.invalidData)
        return
      }
      void this.sendMessage(chatId, this.messages.noLogin)
    })
  }

  async setUsers() {
    const [ users ] = await this.getUsers()
    this.users = users
  }

  setUpBot() { void this.BOT.setMyCommands(this.commands) }

  findUser(fromId) {
    for (const user of this.users)
      if (user.telegramId === fromId) return user
  }

  prepareOperationToInsert(operation, userId) {
    // TODO (developer) - need this.validateOperation()

    const [ value, tikers, information ] = operation
    return `${value},"${tikers.trim()}","${information.trim()}",${userId}`
  }
  async saveOperation(operation) { void await this.insertOperation(operation) }

  sendMessage(chatId, message) { void this.BOT.sendMessage(chatId, message) }
}

new TelegramBotManager()
