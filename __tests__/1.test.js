const puppeteer = require('puppeteer')

describe('管易', () => {
  let page;
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://demo.guanyierp.com/index');
  }, 30000);

  test('1登录', async () => {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForSelector('a[data-target="loginUsername"]');
    await page.click('a[data-target="loginUsername"]') ;//租户登录

    await page.type('#tenantCode', 'k3cloudjccs01');
    await page.type('#code', 'admin');
    await page.type('#pwd', '9TI0veT$');
    await page.click('#loginBtn') ;//登录

  },30000)

});