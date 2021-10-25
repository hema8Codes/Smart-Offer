
let puppeteer = require("puppeteer");
let minimist = require("minimist");
let fs = require("fs");

const BASE_URL = "https://pizzaonline.dominos.co.in/menu?src=google_sem_brand&utm_source=google&utm_medium=cpc&utm_campaign=Brand%20-%20Pan%20India%20-%20MOB%20-%20Exact%20-%202017%20-%20[S]%20-%20Delhi%20NCR&utm_term=[dominos]&gclid=CjwKCAjwq9mLBhB2EiwAuYdMteZxHHll0mIZB75gBNzCthGg9IHT4ZYoa6si0GWrVniQy3frS9tDjxoCcsYQAvD_BwE";

let configJSON = fs.readFileSync("config.json", "utf-8"); // utf-8 we are reading this string in the form of
let configJSO = JSON.parse(configJSON);

async function run(){
    // start the browser
    let browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized'
        ],
        defaultViewport: null,
        
    });

    // get the tab (there is only one tab)
    let pages = await browser.pages();
    let page = pages[0];
    
    // open the url
    await page.goto(BASE_URL,{waitUntil: 'networkidle2'});
    await page.waitFor(700);


    // // close popup
    // await page.waitForSelector("button.ng-binding");
    // await page.click("button.ng-binding");

    await page.waitFor(1000);

    // wait and then click on login on page1
    await page.waitForSelector("div[data-label='my-account']");
    await page.click("div[data-label='my-account']");

    await page.waitFor(700);
    
    // type login number
    await page.waitForSelector("input[name='loginNumber']");
    await page.type("input[name='loginNumber']", configJSO.login, {delay: 28});

    // press click on page3 
    await page.waitForSelector("input[type='submit']");
    await page.click("input[type='submit']");

    //wait for mobile OTP and type it manually
    await page.waitFor(60000);

    // click on delivery 
    await page.waitForSelector("input[name='deliveryType']");
    await page.click("input[name='deliveryType']");

    await page.waitFor(700);

    // click on location address
    await page.waitForSelector("div.lst-wrpr");
    await page.click("div.lst-wrpr");

    await page.waitFor(700);

    // addding favorite pizza
    await page.waitForSelector("#mn-lft > div:nth-child(2) > div > div:nth-child(3) > div > div > div.sc-hqyNC.dOfxST > div.itm-dsc__actn__adCrt > div > button > span");
    await page.click("#mn-lft > div:nth-child(2) > div > div:nth-child(3) > div > div > div.sc-hqyNC.dOfxST > div.itm-dsc__actn__adCrt > div > button > span");
    
    await page.waitFor(700);

    // click on add
    await page.waitForSelector("button.btn-grn");
    await page.click("button.btn-grn");

    await page.waitFor(700);

    // addding favorite pizza
    await page.waitForSelector("#mn-lft > div:nth-child(2) > div > div:nth-child(5) > div > div > div.sc-hqyNC.dOfxST > div.itm-dsc__actn__adCrt > div > button > span");
    await page.click("#mn-lft > div:nth-child(2) > div > div:nth-child(5) > div > div > div.sc-hqyNC.dOfxST > div.itm-dsc__actn__adCrt > div > button > span");

    await page.waitFor(700);

    // click on add
    await page.waitForSelector("button.btn-grn");
    await page.click("button.btn-grn");

    await page.waitFor(700);
    
    // press click on page3 
    await page.waitForSelector("button[data-label='miniCartCheckout']");
    await page.click("button[data-label='miniCartCheckout']");


    // wait and then click on login on page1
    // await page.waitForSelector("a[data-event-action='Login']");
    // await page.click("a[data-event-action='Login']");

  



}


 

run();




