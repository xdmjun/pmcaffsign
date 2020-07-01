const puppeteer = require('puppeteer')
let account = ''
let password = ''
;(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    dumpio: false,
  })
  const page = await browser.newPage()
  page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  )
  await page.setViewport({
    width: 375,
    height: 667,
    isMobile: true,
  })
  await page.goto('https://www.pmcaff.com/user/login?from=topbar', {
    waitUntil: 'networkidle2',
  })
  await page.type('input[name="phone"]', account)
  await page.type('input[name="password"]', password)
  console.log('登录...')
  await page.click('.pmcaff-account .btn-green')
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  })
  console.log('跳转签到页')
  await page.goto('https://www.pmcaff.com/user/sign?from=app', {
    waitUntil: 'networkidle2',
  })
  let btn = await page.$('.sign-btn')
  if (btn) {
    await page.click('.sign-btn')
  }
  await browser.close()
  console.log('签到结束')
})()
