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
        await page.waitForSelector('a[data-target="loginUsername"]');
        await page.click('a[data-target="loginUsername"]') ;//租户登录

        await page.type('#tenantCode', 'k3cloudjccs01');
        await page.type('#code', 'admin');
        await page.type('#pwd', '9TI0veT$');
        await page.click('#loginBtn') ;//登录

        await page.waitForNavigation();
        await page.waitForSelector('span[title="订单管理"]');
        await page.click('span[title="订单管理"]');

        await page.waitForSelector('a[title="订单管理"]');
        await page.click('a[title="订单管理"]');

        await page.waitForSelector('a[title="订单查询"]');

        await page.click('a[title="订单查询"]');
        await page.mouse.click(800, 500); //鼠标 离开 菜单栏悬浮状态
        await page.waitFor(9000);

        // console.log(await page.mainFrame().content());
        // await page.waitForSelector('#tab-1011-btnInnerEl');
        // await page.click('#tab-1011-btnInnerEl');

        await page.waitFor(20000);
        await page.waitForSelector('iframe[name="panel10006602"]');

        const frame = await page.frames().find(f => f.name() === 'panel10006602');
        // console.log(await frame);
        await frame.waitFor(5000);
        await frame.waitForSelector('#triggerCodeId-inputEl');

        await frame.type('#triggerCodeId-inputEl','so123');
        await frame.waitForSelector('#addBtn');
        await frame.click('#addBtn'); //新增订单

        await page.waitFor(20000);

        await page.waitForSelector('iframe[name="panel10006602edit"]');
        const frame_edit = page.frames().find(frame => frame.name() === 'panel10006602edit');
        await frame_edit.waitForSelector('#platformCode');
        await frame_edit.type('#platformCode','123456');
        await frame_edit.type('#barCode','789');

        await page.screenshot({path: screenshot})


    })()
} catch (err) {
    console.error(err)
}
