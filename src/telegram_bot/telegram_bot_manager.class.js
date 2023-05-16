const { DataBase } = require("../db/data_base.class")
const { log } = require("./../helpers/styled_logs")
const { Bot } = require("grammy");

// TODO (developer) - rewrite methods that don't work with this. to functions

class TelegramBotManager extends DataBase {
  constructor () {
    super()
    void this.setUsers()
    void this.onCommands()
    void this.onMessage()
    void this.setUpBot()
  }

  BOT = new Bot(process.env.TELEGRAM_BOT_TOKEN)
  users = null

  onMessage() {
    this.BOT.on(
      "message",
      (context) => this.loginRequired(context, async ({ user, context: { message }}) => {
        const { text, chat: { id: chatId } } = message
        const operation = text.split(",").map((value) => value.trim())
        const isValid = this.validateOperation(operation)
        if (isValid) {
          const preparedOperation = this.prepareToInsert(operation, user.id)
          void this.insertOperation(preparedOperation)
          void this.sendMessage(chatId, this.messages.success)
          log(this.messages.success, preparedOperation)
        }
        else void this.sendMessage(chatId, this.messages.invalidData)
      })
    )
  }

  onCommands() {
    this.BOT.command(
      this.commands[0].command.substring(1),
      (context) => this.loginRequired(context, async ({ user, context: { chat } }) => {
        const [ operations ] = await this.getLastOperations(user.id)
        const preparedOperations = this.prepareOperations(operations)
        void this.sendMessage(chat.id, preparedOperations)
      })
    )
  }

  loginRequired(context, cd) {
    const user = this.findUser(context.from.id)
    if (user) cd({ user, context })
    else this.sendMessage(context.chat.id, this.messages.noLogin)
  }

  async setUsers() {
    const [ users ] = await this.getUsers()
    this.users = users
  }

  async setUpBot() {
    void await this.BOT.api.setMyCommands(this.commands)
  }

  findUser(fromId) {
    try {
      for (const user of this.users)
        if (user.telegramId === fromId) return user
    } catch { return null }
  }

  prepareToInsert(operation, userId) { // TODO (developer) - change bad naming and rewrite type extracting
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

  prepareOperations(operations) { // TODO (developer) - change bad naming
    return operations.map((operation) => {
      const { value, type, tickers, information } = operation
      return `${value}, ${type} ${tickers}, ${information}`
    }).join("\n")
  }

  sendMessage(chatId, message) { void this.BOT.api.sendMessage(chatId, message) }
}

module.exports = {
  telegramBotManager: new TelegramBotManager()
}
