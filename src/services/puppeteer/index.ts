import puppeteer from 'puppeteer';

const urlWebsite =
  'http://www.meteocentrale.ch/it/europa/svizzera/meteo-corvatsch/details/S067910/';

async function selectColumn4(param: string) {
  const data = await document.querySelector(param);
  if (!data) {
    return undefined;
  } else {
    console.log(data.innerHTML);
    return data.innerHTML;
  }
}

async function puppeteerStart(url: string) {
  const browser = await puppeteer.launch();
  const parametro = '.column-4';

  try {
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      selectColumn4(parametro);
    });

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

async function start() {
  const data = await puppeteerStart(urlWebsite);
}

start();
