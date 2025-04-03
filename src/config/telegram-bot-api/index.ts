const telegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN;
const CHAT_ID1 = process.env.TELEGRAM_CHAT_ID1;
const CHAT_ID2 = process.env.TELEGRAM_CHAT_ID2;

const bot = new telegramBot(BOT_TOKEN);

async function sendTelegramMessage(route,  guest, gift?, chat?, customMessage?) {
    const action = 
    route === 'pix' ? `gerou um pix do presente ${gift.name} de ${gift.value}`
    : route === 'mp' ? `acessou o presente ${gift.name} de ${gift.value} pela api do mercado pago`
    : route === 'create' ? `criou o presente ${gift.name}`
    : route === 'update' ? `atualizou o presente ${gift.name}`
    : route === 'delete' ? `removeu o presente ${gift.name}`
    : route === 'newGuest' ? `acessou a lista de presentes pela primeira vez`
    : route === 'custom' ? ''
    : 'realizou uma ação desconhecida';
    const icon = route === 'pix' ? '\ud83d\uded2' : 
    route === 'mp' ? '\ud83d\uded2'
    : route === 'create' ? '\ud83c\udf81'
    : route === 'update' ? '\ud83d\udd04'
    : route === 'delete' ? '\ud83d\uddd1'
    : route === 'newGuest' ? '\ud83d\udd14'
    : route === 'custom' ? ''
    : '\u26a0';

    let message = ''
    if (route === 'custom') {
        message = customMessage;
    } else {
        message = `${icon} ${guest} ${action}!`;
    }

    if (chat === 1) {
        bot.sendMessage(CHAT_ID1, message);
    } else if (chat === 2) {
        bot.sendMessage(CHAT_ID2, message);
    } else {
        bot.sendMessage(CHAT_ID1, message);
        bot.sendMessage(CHAT_ID2, message);
    }
}

export { sendTelegramMessage };