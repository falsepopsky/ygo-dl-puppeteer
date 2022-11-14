import puppeteer from 'puppeteer';
import { boxSite } from './constants.js';

interface BoxesTypes {
  section: string;
  boxes: Array<{ name: string; banner: string; url: string }>;
}

const start = async (): Promise<BoxesTypes[] | undefined> => {
  const browser = await puppeteer.launch({ dumpio: true });
  try {
    const page = await browser.newPage();

    await page.goto(boxSite);

    const response = await page.evaluate(() => {
      const boxes: BoxesTypes[] = [];
      // get the box sections nodes
      const nodes = document.querySelectorAll('.box-list');

      nodes.forEach((node) => {
        const section = node.querySelector('h2')?.textContent;
        // get the list tag nodes of each box node
        const liNodes = node.querySelectorAll('li');
        const data: Array<{ name: string; banner: string; url: string }> = [];

        liNodes.forEach((li) => {
          const name = li.querySelector('a img')?.getAttribute('alt');
          const banner = li.querySelector('a img')?.getAttribute('src');
          const url = li.querySelector('a')?.getAttribute('href');
          if (typeof name === 'string' && typeof banner === 'string' && typeof url === 'string') {
            data.push({ name, banner, url });
          }
        });

        if (typeof section === 'string') {
          boxes.push({ section, boxes: data });
        }
      });

      return boxes;
    });
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
};

start().catch((err) => console.log(err));

export { start };
