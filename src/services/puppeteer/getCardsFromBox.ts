import puppeteer from 'puppeteer';

interface cardItem {
  id: number;
  name: string;
  type: string;
}

async function getCards(url: string) {
  const browser = await puppeteer.launch();
  const urlBox: string = `https://www.konami.com/yugioh/duel_links/en/box/${url}/`;

  try {
    const page = await browser.newPage();
    await page.goto(urlBox);

    const result = await page.evaluate(() => {
      const container = document.querySelector<HTMLInputElement>('.card-list');

      if (!container) {
        let noCards: string = 'Update the container class!';
        return noCards;
      } else {
        let cards = container.querySelectorAll<HTMLInputElement>('li')!;
        let objectCards: cardItem[] = [];

        cards.forEach((card, index) => {
          let id = index;
          let name = card.querySelector<HTMLInputElement>('dt')!.innerText;
          let type = card.querySelector<HTMLInputElement>('dd')!.innerText;
          const dataCards = { id, name, type };
          objectCards.push(dataCards);
        });
        return objectCards;
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('browser closed');
    await browser.close();
  }
}

export default getCards;
