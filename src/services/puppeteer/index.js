const puppeteer = require('puppeteer');

const urlWebsite =
  'http://www.meteocentrale.ch/it/europa/svizzera/meteo-corvatsch/details/S067910/';

async function puppeteerStart() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(
      'http://www.meteocentrale.ch/it/europa/svizzera/meteo-corvatsch/details/S067910/'
    );

    const result = await page.evaluate(() => {
      let temperature = document.querySelector('.column-4');
      let temperatureText;
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
  const data = await puppeteerStart(urlWebsite);
  console.log(data);
}

start();
