const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

(async () => {
  console.log(chalk.green('第一次启动，写入wsEndpoint！'))
  const browser = await puppeteer.launch({headless:false,args: ['--start-maximized', '--window-size=1920,1080']});
  mkdirp.sync(DIR);
  console.log(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
})();

