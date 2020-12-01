import puppeteer from 'puppeteer';

interface boxInfo {
  imageCover: string;
  subject: string;
}

async function buildObjectInfo(imageCover: string, subject: string) {
  let infoBox: boxInfo[] = [];
  const dataInfoBox = { imageCover, subject };
  infoBox.push(dataInfoBox);
  return infoBox;
}

async function getInfoFromTheBox(boxName: string) {
  const browser = await puppeteer.launch();
  let urlBox: string = `https://www.konami.com/yugioh/duel_links/en/box/${boxName}/`;
  let image: string = `https://img.konami.com/yugioh/duel_links/en/box/${boxName}/images/main.jpg?v=2`;

  try {
    const page = await browser.newPage();
    await page.goto(urlBox);

    const subject: string = await page.evaluate(() => {
      const getSubject = document.querySelector<HTMLInputElement>(
        '.catch-copy'
      )!;

      if (!getSubject) {
        let notSubject = '';
        return notSubject;
      } else {
        let subjectText: string = getSubject.innerHTML.replace('<br>', ' ');
        return subjectText;
      }
    });

    const objectInfo = await buildObjectInfo(image, subject);

    return objectInfo;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('browser closed');
    await browser.close();
  }
}

export default getInfoFromTheBox;
