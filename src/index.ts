import { getCards, getInfo } from './services/puppeteer/index';

let nameBox: string = 'voltageofthemetal';

async function start() {
  const cardsBoxData = await getCards(nameBox);
  const infoBoxData = await getInfo(nameBox);
  console.log(cardsBoxData);
  console.log(infoBoxData);
}

start();
