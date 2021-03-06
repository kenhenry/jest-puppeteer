const puppeteer = require('puppeteer')
let browser
let page

beforeAll(async () => {
  // browser = await puppeteer.launch({headless:false,args: ['--start-maximized', '--window-size=1920,1080']})
  browser = global.__BROWSER__;
  // page = await browser.newPage()
  page = (await browser.pages())[0];
  await page.setViewport({ width: 1920, height: 1080 });
  // await page.tracing.start({path: 'trace.json'})
})

describe('管易', () => {

  test('1登录', async () => {
    // page = await global.__BROWSER__.newPage();
    await page.goto('http://demo.guanyierp.com/index');
    await page.waitForSelector('a[data-target="loginUsername"]');
    await page.click('a[data-target="loginUsername"]') ;//租户登录
    await page.type('#tenantCode', 'k3cloudjccs01');
    await page.type('#code', 'admin');
    await page.type('#pwd', '9TI0veT$');
    await page.click('#loginBtn') ;//登录

  },30000)

  test('2打开订单查询', async () => {
    await page.waitForSelector('span[title="订单管理"]');
    await page.click('span[title="订单管理"]');
    await page.waitForSelector('a[title="订单管理"]');
    await page.click('a[title="订单管理"]');
    await page.waitForSelector('a[title="订单查询"]');
    await page.click('a[title="订单查询"]');
    await page.mouse.click(800, 500); //鼠标 离开 菜单栏悬浮状态

    // await page.waitForSelector('iframe[name="panel10006602"]'); //订单查询界面
    //
    // await page.waitFor(5000);
    // const frame_check = await page.frames().find(frame_check => frame_check.name() === 'panel10006602');
    // // await page.waitFor(3000);
    // await frame_check.waitForSelector('#addBtn');
    // await frame_check.click('#addBtn'); //新增订单

  }, 10000)

  test('3新增订单', async () => {
    await page.waitFor(10000);
    console.log(await page.title())
    await page.waitForSelector('iframe[name="panel10006602"]'); //订单查询界面

    // await page.waitFor(3000);
    const frame_check = await page.frames().find(frame_check => frame_check.name() === 'panel10006602');
    // await page.waitFor(3000);
    await frame_check.waitForSelector('#addBtn');
    await frame_check.click('#addBtn'); //新增订单

    await page.waitFor(3000);
    await page.waitForSelector('iframe[name="panel10006602edit"]'); //新增订单界面
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

    await frame.$eval('#vipSrhForm  div.form-item:first-child .text',input => input.value='' ); // 清空文本框上的值。

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

    await frame.waitForSelector('div.form-field > input#platformCode');
    await frame.type('div.form-field > input#platformCode','110');

    await frame.click('#frmAddSaveBtn');//保存

    await page.waitFor(2000);
    await page.waitForSelector('iframe[name="panel10006602"]');
    const frame_so = page.frames().find(frame => frame.name() === 'panel10006602');

    await frame_so.waitForSelector('#triggerPlatformId-inputEl');    //按平台单号查找新增的订单，然后审核
    await frame_so.type('#triggerPlatformId-inputEl','110');
    await page.keyboard.press('Enter');

    await page.waitFor(2000);
    await frame_so.waitForSelector('div.x-grid-row-checker');  //勾选
    await frame_so.click('div.x-grid-row-checker');

    await frame_so.waitForSelector('#approveBtn'); // 审核订单
    await frame_so.click('#approveBtn');
    await page.waitFor(2000);
    await page.keyboard.press('Enter');

    await page.waitFor(3000);
    await page.waitForSelector('span.x-tab-close-btn');
    await page.click('span.x-tab-close-btn');  //关闭订单查询页面


  }, 300000)





  afterAll(async () => {
    // await page.tracing.stop()
    await browser.disconnect()
  })
})
