const puppeteer = require('puppeteer');

const WBS =
  'https://www.konami.com/yugioh/duel_links/en/box/voltageofthemetal/';

async function puppeteerStart(website) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(website);

    const result = await page.evaluate(() => {
      let container = document.querySelector('.card-list');
      let objectCards = [];

      if (!container) {
        console.log('no hay container de Cajas');
      } else {
        console.log('hay container');
        let cards = container.querySelectorAll('li');

        if (!cards) {
          console.log('no hay li');
        } else {
          cards.forEach((card, index) => {
            let indice = index;
            let cardName = card.querySelector('dt').innerText;

            let cardType = card.querySelector('dd').innerHTML;
            const dataCard = { indice, cardName, cardType };
            objectCards.push(dataCard);
          });
        }
      }

      return objectCards;
    });

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('browser closed');
    await browser.close();
  }
}

async function start() {
  const data = await puppeteerStart(WBS);
  console.log(data);
}

start();
