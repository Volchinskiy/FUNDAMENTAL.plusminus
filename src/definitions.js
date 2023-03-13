class Definitions {
  commands = [
    { command: '/see_last_operations', description: 'Type this command to see the last 10 operations.' },
  ]
  messages = {
    success: '✅ [SUCCESS]',
    invalidData: '❌ [ERROR]: Invalid data.',
    noLogin: '❌ [ERROR]: You aren\'t login.',
  }
}

module.exports = { Definitions }