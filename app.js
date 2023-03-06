import TelegramBot from 'node-telegram-bot-api';
import Validate from './validate.js'
import Handler from './handler.js';
import cron from 'node-cron';


const token = '6127897079:AAEkAC_N8ek6tAIyWL0wNMlCJ9Lcgd1Kw04';
const bot = new TelegramBot(token, { polling: true });
let handler = new Handler(bot);
let validate = new Validate(handler);

const chatId = '-1001517533880'

const sendMessage = () => {
    bot.sendMessage(chatId, 'Не забудьте отправить отчеты до 11 часов !!!');
};
cron.schedule('30 4 * * 1-5', sendMessage);

bot.on('message', (msg) => {
    validate.validateMsg(msg, bot)
    console.log(msg);
})