import puppeteer from 'puppeteer';

type KonamiLanguage = 'en' | 'ja';

interface BoxDetail {
  name?: string;
  url?: string;
}

interface BoxSet {
  name: string;
  type: string;
  rarity: string;
}

/**
 * List of Boxes.
 * @param language - Language to fetch the list of boxes `en` for english and `ja` for japanese.
 * @returns Returns an Array of objects {name, url}.
 */
async function getBoxesList(language: KonamiLanguage): Promise<BoxDetail[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.konami.com/yugioh/duel_links/${language}/box/`);

  const response = await page.$$eval('.box-list ul li', (elements) => {
    if (elements.length === 0) {
      throw new Error('Boxes list classname needs an update');
    }

    const data = elements
      .map((element) => {
        const name = element.querySelector('a img')?.getAttribute('alt')?.trim();
        const url = element.querySelector('a')?.getAttribute('href')?.trim();

        return { name, url };
      })
      .filter((box) => typeof box.name !== 'undefined');
    return data;
  });

  await browser.close();

  return response;
}

/**
 * Set of cards from the box.
 * @param language - Language to fetch the set of cards `en` for english and `ja` for japanese.
 * @param sufixUrl - Sufix URL of the name box.
 * @returns Returns an Array of objects {name, type & rarity}.
 */
async function getBoxSet(language: KonamiLanguage, sufixUrl: string): Promise<BoxSet[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.konami.com/yugioh/duel_links/${language}/box/${sufixUrl}`);

  const response = await page.$$eval('.card-list li', (elements) => {
    if (elements.length === 0) {
      throw new Error('Card list classname needs an update');
    }

    const boxSet: BoxSet[] = [];

    elements.forEach((element) => {
      const name = element.querySelector('dt')?.textContent;
      const type = element.querySelector('dd')?.textContent;

      // STRUCTURE DECKS repeats cards, if it's already in the array it will return early.
      if (boxSet.some((card) => card.name === name)) return;

      const ur = element.querySelector('a')?.classList.contains('rare-ur');
      const sr = element.querySelector('a')?.classList.contains('rare-sr');
      const rare = element.querySelector('a')?.classList.contains('rare-r');

      if (
        typeof name === 'string' &&
        typeof type === 'string' &&
        typeof ur === 'boolean' &&
        typeof sr === 'boolean' &&
        typeof rare === 'boolean'
      ) {
        const rarity = ur ? 'Ultra Rare' : sr ? 'Super Rare' : rare ? 'Rare' : 'Normal';
        boxSet.push({ name, type, rarity });
      }
    });
    return boxSet;
  });

  await browser.close();

  return response;
}

export { getBoxesList, getBoxSet };
