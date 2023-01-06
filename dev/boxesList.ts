import { getBoxesList } from '../dist/index.js';

async function start(): Promise<void> {
  try {
    console.log('Scraping Boxes list in English and Japanese');

    const englishBoxesList = await getBoxesList('en');
    const japaneseBoxesList = await getBoxesList('ja');

    console.table(englishBoxesList);
    console.table(japaneseBoxesList);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      throw error;
    }
  }
}

await start();
