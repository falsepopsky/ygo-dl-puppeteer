import { writeFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getBoxesList } from './puppeteer.js';

/**
 * Write boxes list (en & jp) files.
 */
async function writeBoxesFiles(): Promise<void> {
  try {
    console.log('Scraping english and japanese boxes list');
    const scriptPath = fileURLToPath(import.meta.url);
    const path = dirname(scriptPath);

    const englishData = await getBoxesList('en');
    const japaneseData = await getBoxesList('ja');

    await writeFile(path + '/en.json', JSON.stringify(englishData));
    await writeFile(path + '/jp.json', JSON.stringify(japaneseData));
    console.log('Successfully boxes list files created');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      throw error;
    }
  }
}

await writeBoxesFiles();
