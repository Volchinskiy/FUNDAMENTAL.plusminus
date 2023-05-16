class Definitions {
  commands = [
    { command: '/last_ten', description: 'Type to see the last 10 operations.' },
  ]
  messages = {
    success: '🟢 [SUCCESS]',
    invalidData: '🔴 [ERROR]: Invalid data.',
    noLogin: '🔴 [ERROR]: You aren\'t login.',
  }
  tickers = {
    plus: "p",
    minus: "m"
  }
}

module.exports = { Definitions }