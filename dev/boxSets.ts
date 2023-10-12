import { getBoxSet } from '../src/index.js';

async function start(): Promise<void> {
  try {
    console.log('Scraping Hero Rising Box in English and Japanese');

    const englishSet = await getBoxSet('en', 'sd-hero_rising/');
    const japaneseSet = await getBoxSet('ja', 'sd-hero_rising/');

    console.table(englishSet);
    console.table(japaneseSet);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      throw error;
    }
  }
}

await start();
