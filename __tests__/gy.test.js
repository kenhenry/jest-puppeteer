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
  console.log('beforeall');
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
    // const page = (await browser.pages())[1];

    await page.waitForSelector('span[title="订单管理"]');
    await page.setViewport({ width: 1920, height: 1080 });
    console.log((await browser.pages()).length);
    console.log((await page.url()));
    console.log(await page.title());

    await page.click('span[title="订单管理"]');

    await page.waitForSelector('a[title="订单管理"]');
    await page.click('a[title="订单管理"]');

    await page.waitForSelector('a[title="订单查询"]');

    await page.click('a[title="订单查询"]');
    await page.mouse.click(800, 500); //鼠标 离开 菜单栏悬浮状态
  }, 10000)
  
  // afterAll(async () => {
  //   await page.tracing.stop()
  //   await browser.close()
  // })
})
