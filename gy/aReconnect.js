const fs = require("fs");
const puppeteer = require('puppeteer');
var wsEndpoint = fs.readFileSync('lib/wsEndpoint.txt','utf-8');

(async () => {
    const browser = await puppeteer.connect({'browserWSEndpoint':wsEndpoint });
    const page = await browser.newPage();
    await page.goto("https://yunzhijia.com");
    console.log(await page.title());
    browser.disconnect();
})();