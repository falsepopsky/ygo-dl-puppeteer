# Duel Links Box Scrapper

<div align="center">
  	<img style="margin: 2em 0;" src="docs/images/duel_links_logo.png" alt="Duel Links Logo"/>
</div>

## **In this project you can get information from a selected box launche in duel links, like monsters, spells, image set, cover, etc.**

why?, this is another sample/test, I like to play with some libraries from npm and build something.

<div align="center" style="margin: 2em 0;">
    <img src="docs/images/main_box.png" alt="Main Box Section" />
    <img src="docs/images/mini_box.png" alt="Mini Box Section" />
    <img src="docs/images/structure_deck.png" alt="Structure Deck Section" />
</div>

## 1. Built with :hammer_and_wrench:

```
puppeteer, typescript
```

<div style="margin: 2em 0;">

## 2. How to start the Project

</div>

### What you need

```
node.js, typescript.
```

### Clone repository

```
$ git clone git@github.com:falsepopsky/ygo-dl-puppeteer.git
```

### Install the project and run

```
# install dependencies
npm install

# run the project
1. npm run build
2. npm run start

or with typescript just type: npm run dev
```

### Box Info

:warning: Edit the value of nameBox variable on index.ts, and put the name of the box you want to get information.
[Duel Links Box](https://www.konami.com/yugioh/duel_links/en/box/).

Example: I need data from Antinomic Theory Box, so...

```
let nameBox: string = 'antinomictheory';
```

<div style="margin: 4em 0 2em 0;">

## 3. Folder Structure :open_file_folder:

</div>

    .
    ├── build                   # To run the project in production mode
    ├── docs                    # Documentation files
    ├── src                     # Source files
    │   └── services
    │       └── puppeteer       # Scrapper function.
    ├── index.ts                # To run the project in dev mode
    └── README.md

## 4. License :scroll:

[GPL-3.0 License](https://github.com/falsepopsky/ygo-dl-puppeteer/blob/main/LICENSE)
