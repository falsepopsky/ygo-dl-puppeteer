import puppeteer from 'puppeteer';

const URL_DUEL_LINKS_BOX = 'https://www.konami.com/yugioh/duel_links/en/box/';

/*  async function selectColumn4(param: string) {
  const data = await document.querySelector(param);
  if (!data) {
    return undefined;
  } else {
    console.log(data.innerHTML);
    return data.innerHTML;
  }
}

*/

async function puppeteerStart(url: string) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      const containerDuelLinksPosts = document.querySelector<HTMLInputElement>(
        '.rpBJOHq2PR60pnwJlUyP0 div'
      );
      let temperatureText: any;
      if (!containerDuelLinksPosts) {
        console.log('no hay posts de Duel Links');
      } else {
        temperatureText = containerDuelLinksPosts.innerText;
        return temperatureText;
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

async function start() {
  const data = await puppeteerStart(URL_DUEL_LINKS_BOX);
  console.log(data);
}

start();
