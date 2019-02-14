const fs = require("fs");
const puppeteer = require('puppeteer');
var wsEndpoint = fs.readFileSync('wsEndpoint.txt','utf-8');

(async () => {
    const browser = await puppeteer.connect({'browserWSEndpoint':wsEndpoint });
    const page = (await browser.pages())[1];
    await page.setViewport({ width: 1920, height: 1080 });
    console.log((await browser.pages()).length);
    console.log((await page.url()));
    console.log(await page.title());

    const frame = page.frames().find(frame => frame.name() === 'panel10006602edit');

    await frame.waitForSelector('#warehouseId-inputEl'); //录入 仓库
    await frame.click('#warehouseId-inputEl');
    await frame.waitFor(2000);
    await frame.waitForSelector('input[id^=textfield][name*=inputEl]');
    await frame.type('input[id^=textfield][name*=inputEl]','管易仓');
    await frame.waitFor(2000);
    await frame.waitForXPath('//div[contains(text(), "管易仓")]', 5000);
    const [element] = await frame.$x('//div[contains(text(), "管易仓")]');
    await element.click();

    await frame.waitForSelector('#searchVipName');  //录入 会员
    await frame.click('#searchVipName');
    await frame.waitFor(2000);
    await frame.waitForSelector('#vipSrhForm  div.form-item:first-child .text');
    await frame.type('#vipSrhForm  div.form-item:first-child .text','001');
    await frame.click('#vipSearchBtn');
    await frame.waitFor(2000);
    await frame.click('#vipListGrid-body .x-grid-row-checker');
    await frame.click('#selectVipSureBtn');

    await frame.waitForSelector('#orderTypeId');  //录入 订单类型
    await frame.click('#orderTypeId');
    await frame.waitForSelector('#selectLstWrap_orderTypeId > div:nth-child(1)');
    await frame.click('#selectLstWrap_orderTypeId > div:nth-child(1)')

    await frame.waitFor(2000);
    await frame.waitForSelector('#addTagItem');
    await frame.click('#addTagItem'); //新增 物料

    await frame.waitForSelector('#prtSrhForm:first-child #likeCode');
    await frame.type('#prtSrhForm:first-child #likeCode','0.001');
    await page.keyboard.press('Enter');

    await frame.waitForSelector('tbody[id^= "gridview-1030-body"]  .x-grid-row-checker');  //
    await frame.click('tbody[id^= "gridview-1030-body"]  .x-grid-row-checker');
    await frame.click('#addPrtSureBtn');

    await frame.waitForSelector('#frmItemAdd #expressId');  //录入 快递公司
    await frame.click('#frmItemAdd #expressId');
    await frame.waitForSelector('#selectLstWrap_expressId .selectItem:first-child');
    await frame.click('#selectLstWrap_expressId .selectItem:first-child');

    await frame.click('#frmAddSaveBtn');//保存

    await page.waitFor(2000);
    await page.waitForSelector('iframe[name="panel10006602"]');
    const frame_so = page.frames().find(frame => frame.name() === 'panel10006602');

    await frame_so.waitForSelector('#triggerCodeId-inputEl');
    await frame_so.type('#triggerCodeId-inputEl','SO2596262364');
    await page.keyboard.press('Enter');

    await frame_so.waitForXPath('//div[contains(text(), "未配货")]', 5000);
    const [element2] = await frame_so.$x('//div[contains(text(), "未配货")]');
    await element2.click();

    await frame_so.waitForSelector('#approveBtn'); // 审核订单
    await frame_so.click('#approveBtn');
    await page.waitFor(2000);
    await page.keyboard.press('Enter');





    browser.disconnect();
})();