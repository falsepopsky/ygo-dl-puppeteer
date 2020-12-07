import { getCards, getInfo } from './src/services/puppeteer/index';

let nameBox: string = 'voltageofthemetal';

async function start() {
  console.log('-------------');
  console.log('Started');
  const cardsBoxData = await getCards(nameBox);
  const infoBoxData = await getInfo(nameBox);
}

start();
