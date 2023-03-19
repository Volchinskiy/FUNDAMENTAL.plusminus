require("dotenv").config()
const { DataBase } = require("../db/data_base.class")
const TelegramApi = require("node-telegram-bot-api")
const { log } = require("./../helpers/styled_logs")

class TelegramBotManager extends DataBase {
  constructor () {
    super()
    void this.setUsers()
    void this.setUpBot()
    void this.onMessage()
  }

  BOT = new TelegramApi(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
  users = null

  onMessage() {
    this.BOT.on("message", async (message) => {
      const { text, from: { id: fromId }, chat: { id: chatId } } = message
      const user = this.findUser(fromId)
      if (user) {
        const { id: userId } = user

        if (text === this.commands[0].command) {
          const [ operations ] = await this.getLastOperations(userId)
          const preparedOperations = this.prepareOperations(operations)
          void this.sendMessage(chatId, preparedOperations.join("\n"))
          return
        }

        const operation = text.split(",").map((value) => value.trim())
        const isValid = this.validateOperation(operation)
        if (isValid) {
          const preparedOperation = this.prepareToInsert(operation, userId)
          void this.insertOperation(preparedOperation)
          void this.sendMessage(chatId, this.messages.success)
          log(this.messages.success, preparedOperation)
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
    try {
      for (const user of this.users)
        if (user.telegramId === fromId) return user
    } catch { return null }
  }

  prepareToInsert(operation, userId) {
    var [ value, tickers, information ] = operation
    var type
    const tickersArray = tickers.split(" ")
    for (let i = 0; i < tickersArray.length; i++) {
      const ticker = tickersArray[i];
      if (ticker === this.tickers.plus || ticker === this.tickers.minus) {
        type = ticker
        void tickersArray.splice(i, 1)
        tickers = tickersArray.join(" ")
      }
    }
    return `${value},"${type}","${tickers}","${information}",${userId}`
  }

  validateOperation(operation) {
    if (operation.length !== 3) return false
    const hasLetter = new RegExp(/\D/, "g")
    const [value, tickers] = operation
    if (hasLetter.test(value)) return false
    const hasType = new RegExp(`\\b${this.tickers.plus}\\b|\\b${this.tickers.minus}\\b`, "g") // get true it string has 'p' or 'm' and possible spaces around
    if (!hasType.test(tickers)) return false
    return true
  }

  prepareOperations(operations) {
    return operations.map((operation) => {
      const { value, type, tickers, information } = operation
      return `${value} ${type} ${tickers} ${information}`
    })
  }

  sendMessage(chatId, message) { void this.BOT.sendMessage(chatId, message) }
}

new TelegramBotManager()
