const puppeteer = require('puppeteer')
const screenshot = 'gy.png'
try {
    (async () => {
        const browser = await puppeteer.launch({headless:false,args: ['--start-maximized', '--window-size=1920,1080']})
        const page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })

        await page.goto('http://demo.guanyierp.com/index')
        await page.waitForSelector('a[data-target="loginUsername"]')
        await page.click('a[data-target="loginUsername"]') //租户登录

        await page.type('#tenantCode', 'k3cloudjccs01')
        await page.type('#code', 'admin')
        await page.type('#pwd', '9TI0veT$')

        await page.click('#loginBtn')
        /*
        await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
        await page.screenshot({path: 'youtube_fm_dreams_list.png'})
        const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
        await videos[2].click()
        await page.waitForSelector('.html5-video-container')
        await page.waitFor(5000)
        await page.screenshot({ path: screenshot })
        await browser.close()
        console.log('See screenshot: ' + screenshot)
        */
    })()
} catch (err) {
    console.error(err)
}
