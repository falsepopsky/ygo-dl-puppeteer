import puppeteer from 'puppeteer';

const URL_DUEL_LINKS_REDDIT = 'https://www.reddit.com/r/DuelLinks/';

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
      const temperature = document.querySelector<HTMLInputElement>('.column-4');
      let temperatureText: any;
      if (!temperature) {
        console.log('no hay temperatura');
      } else {
        temperatureText = temperature.innerText;
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
  const data = await puppeteerStart(URL_DUEL_LINKS_REDDIT);
  console.log(data);
}

start();
