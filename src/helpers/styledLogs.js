const log = (...str) => console.log("\x1b[1m%s\x1b[0m", ...str);
const info = (...str) => console.info(`\x1b[1m\x1b[44m%s\x1b[0m`, ...str)
const warn = (...str) => console.warn(`\x1b[1m\x1b[43m%s\x1b[0m`, ...str)
const error = (...str) => console.error(`\x1b[1m\x1b[41m%s\x1b[0m`, ...str)
const success = (...str) => console.log(`\x1b[1m\x1b[42m%s\x1b[0m`, ...str)
module.exports = { log, info, warn, error, success }