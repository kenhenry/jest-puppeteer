const puppeteer = require('puppeteer')
const fs = require('fs');
const screenshot = 'gy.png'
const screenshotE = 'gyE.png'
try {
    (async () => {
        const browser = await puppeteer.launch({headless:false,args: ['--start-maximized', '--window-size=1920,1080']})
        const browserWSEndpoint = browser.wsEndpoint();
        console.log(browserWSEndpoint);
        fs.writeFile('wsEndpoint.txt', browserWSEndpoint,function(err){
            if(err) console.log('wsEndpoint写入失败');
            else console.log('wsEndpoint写入成功');});

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto('http://demo.guanyierp.com/index');
        // await page.waitForNavigation(2000);
        await page.waitForSelector('a[data-target="loginUsername"]');
        await page.click('a[data-target="loginUsername"]') ;//租户登录

        await page.type('#tenantCode', 'k3cloudjccs01');
        await page.type('#code', 'admin');
        await page.type('#pwd', '9TI0veT$');
        await page.click('#loginBtn') ;//登录

        await page.screenshot({path: screenshot})

        // await page.waitForSelector('a[data-target="loginUsername"]');
        // await page.click('a[data-target="loginUsername"]') ;//租户登录
        // await page.type('#tenantCode', 'k3cloudjccs01');
        // await page.type('#code', 'admin');
        // await page.type('#pwd', '9TI0veT$');
        // await page.click('#loginBtn') ;//登录


    })()
} catch (err) {
    console.error(err)
}
