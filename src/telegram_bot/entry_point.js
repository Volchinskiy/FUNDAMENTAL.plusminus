const express = require("express");
const { webhookCallback } = require("grammy");
const { telegramBotManager } = require('./telegram_bot_manager.class.js');
const { info } = require('./../helpers/styled_logs.js');

if (process.env.IS_PRODUCTION === "true") {
  const server = express();
  server.use(express.json());
  server.use(webhookCallback(telegramBotManager.BOT, "express"));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => info(` BOT STARTED ON ${PORT} PORT `));
} else {
  telegramBotManager.BOT.start();
  info(` BOT STARTED `)
}
