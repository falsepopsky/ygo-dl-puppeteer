import { getBoxSet } from '../dist/index.js';

async function start(): Promise<void> {
  const englishSet = await getBoxSet('en', 'sd-hero_rising/');
  const japaneseSet = await getBoxSet('ja', 'sd-hero_rising/');

  console.table(englishSet);
  console.table(japaneseSet);
}

start().catch((err) => {
  console.error(err);
});
