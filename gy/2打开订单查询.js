const fs = require("fs");
const puppeteer = require('puppeteer');
var wsEndpoint = fs.readFileSync('wsEndpoint.txt','utf-8');

(async () => {
    const browser = await puppeteer.connect({'browserWSEndpoint':wsEndpoint });
    const page = (await browser.pages())[0];
    await page.setViewport({ width: 1920, height: 1080 });
    console.log((await browser.pages()).length);
    console.log((await page.url()));
    console.log(await page.title());

    await page.waitForSelector('span[title="订单管理"]');
    await page.click('span[title="订单管理"]');

    await page.waitForSelector('a[title="订单管理"]');
    await page.click('a[title="订单管理"]');

    await page.waitForSelector('a[title="订单查询"]');

    await page.click('a[title="订单查询"]');
    await page.mouse.click(800, 500); //鼠标 离开 菜单栏悬浮状态
    await page.waitFor(3000);


    browser.disconnect();
})();
