const log = (...values) => console.log("\x1b[1m%s\x1b[0m", ...values)
const info = (...values) => console.info(`\x1b[1m\x1b[44m%s\x1b[0m`, ...values)
const warn = (...values) => console.warn(`\x1b[1m\x1b[43m%s\x1b[0m`, ...values)
const error = (...values) => console.error(`\x1b[1m\x1b[41m%s\x1b[0m`, ...values)
const success = (...values) => console.log(`\x1b[1m\x1b[42m%s\x1b[0m`, ...values)
module.exports = { log, info, warn, error, success }