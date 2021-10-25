// npm init -y
// npm install minimist
// npm install axios
// npm install jsdom

// node dominoscoupon.js --source=https://www.grabon.in/dominos-coupons/ --dest=coupon.json


let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let fs = require("fs");
let path = require("path");

let args = minimist(process.argv);

// download using axios
// extract information using jsdom
// manipulate data using array function


let responseKaPromise = axios.get(args.source);
responseKaPromise.then(function (response) {
    let html = response.data;
    // console.log(html);
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;

    let coupons = [];
    let couponDivs = document.querySelectorAll("div.gc-box");
    console.log(couponDivs.length);
    for (let i = 0; i < couponDivs.length; i++) {
        let coupondiv = couponDivs[i];
        let coupon = {
            couponcode: ""
        };

        let resultSpan = coupondiv.querySelector("div.gcbr-r > span > span.visible-lg");
        coupon.couponcode = resultSpan.textContent;

       if(coupon.couponcode != "ACTIVATE OFFER"){
        coupons.push(coupon);
       }
    }
   
    console.log(coupons);

    let couponJSON = JSON.stringify(coupons);
    fs.writeFileSync(args.dest, couponJSON, "utf-8");


})