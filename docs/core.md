# puppeteer

> First of all, this "project" should not be taken seriously or even use in production!, I really wanted to "play" with this package `puppeteer` some time ago and use it on DUEL LINKS'S Konami Site for learning purposes. After some time I decided to rewrite and clean up the code, just to align it with how I work right now and add some kind of resolution in this doc.

## This project 100% it isn't good to use with puppeteer.

- Slow startup with Chromium (4~5s >).
- The scrapped data for this project, it doesn't require browser events "things" (click, login, etc.).
- The best solution is just use the normal `fetch` or `HTTP` from `node` and packages like `cheerio` or `jsdom` to extract the required data.


## Why I don't use map().

- The most irrelevant it's because of the **types**, I use `querySelector` to extract some text and return an Array{objects}, ts add types of `undefined` or `null`, so instead I just use `forEach` and do a proper check to remove this problem.
- **Duplicated data**. OK, there are some good solutions out [there](https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects) to remove duplicated objects, but if I have the control to work from the start with the elements, why i shouldn't take care of that by myself?.
- In the function `getBoxesList` I decided to give it a try, just because I was lazy.
