import TelegramBot from 'node-telegram-bot-api';
import Validate from './validate.js'
import Handler from './handler.js';
const token = '6127897079:AAEkAC_N8ek6tAIyWL0wNMlCJ9Lcgd1Kw04';
const bot = new TelegramBot(token, { polling: true });
let handler = new Handler(bot);
let validate = new Validate(handler);

bot.on('message', (msg) => {
    validate.validateMsg(msg, bot)
    console.log(msg);

})