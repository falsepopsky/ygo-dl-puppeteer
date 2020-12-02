import puppeteer from 'puppeteer';

interface boxInfo {
  heroCover: string;
  cardsImageFullList: string;
  subject: string;
}

async function buildObjectInfo(
  heroCover: string,
  cardsImageFullList: string,
  subject: string
) {
  let infoBox: boxInfo[] = [];
  const dataInfoBox = { heroCover, cardsImageFullList, subject };
  infoBox.push(dataInfoBox);
  return infoBox;
}

async function getInfo(boxName: string) {
  const browser = await puppeteer.launch();
  let urlBox: string = `https://www.konami.com/yugioh/duel_links/en/box/${boxName}/`;
  let imageHero: string = `https://img.konami.com/yugioh/duel_links/en/box/${boxName}/images/main.jpg?v=2`;
  let imageCards: string = `https://img.konami.com/yugioh/duel_links/en/box/${boxName}/images/card_en.jpg?v=2`;

  try {
    const page = await browser.newPage();
    await page.goto(urlBox);

    const subject: string = await page.evaluate(() => {
      const getSubject = document.querySelector<HTMLInputElement>(
        '.catch-copy'
      )!;

      if (!getSubject) {
        let notSubject = 'Update the subject container class!';
        return notSubject;
      } else {
        let subjectText: string = getSubject.innerHTML.replace('<br>', ' ');
        return subjectText;
      }
    });

    const objectInfo = await buildObjectInfo(imageHero, imageCards, subject);

    return objectInfo;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('browser closed');
    await browser.close();
  }
}

export default getInfo;
