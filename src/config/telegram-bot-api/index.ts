const telegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN;
const CHAT_ID1 = process.env.TELEGRAM_CHAT_ID1;
const CHAT_ID2 = process.env.TELEGRAM_CHAT_ID2;

const bot = new telegramBot(BOT_TOKEN);

async function sendTelegramMessage(route,  guest, gift?, chat?, customMessage?) {
    const action = 
    route === 'addGiftToGuest' ? `escolheu o presente ${gift}`
    : route === 'removeGiftFromGuest' ? `removeu o presente ${gift} da sua lista de presentes escolhidos`
    : route === 'newGuest' ? `acessou a lista de presentes pela primeira vez`
    : route === 'createGift' ? `criou o presente ${gift}`
    : route === 'updateGift' ? `atualizou o presente ${gift}`
    : route === 'deleteGift' ? `deletou o presente ${gift}`
    : route === 'custom' ? ''
    : 'realizou uma ação desconhecida';
    const icon = route === 'addGiftToGuest' ? '\ud83d\uded2' : 
    route === 'removeGiftFromGuest' ? '\u274c'
    : route === 'newGuest' ? '\ud83d\udd14'
    : route === 'createGift' ? '\ud83c\udf81'
    : route === 'updateGift' ? '\ud83d\udd04'
    : route === 'deleteGift' ? '\ud83d\uddd1'
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