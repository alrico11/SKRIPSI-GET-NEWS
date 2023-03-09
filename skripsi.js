const delay = require('delay');
var figlet = require('figlet');
var chalk = require('chalk');
const cheerio = require('cheerio');
const axios = require('axios');
const { stringify, parse } = require('querystring');
const console = require('console');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

console.log(
  chalk.redBright(
    figlet.textSync('SKRIPSIIIII', { horizontalLayout: 'fitted' })
  )
);
var angka1 = Math.floor(Math.random() * 100) + 100
var angka2 = Math.floor(Math.random() * 100) + 25

var o = 1;
const userAgentList = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/' + angka1 + '.36 (KHTML, like Gecko) Chrome/' + angka2 + '.0.4577.' + angka2 + ' Safari/' + angka1 + '.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/' + angka1 + '.1.' + angka2 + ' (KHTML, like Gecko) Version/14.0.3 Mobile/15E' + angka1 + ' Safari/' + angka1 + '.1',

  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/' + angka1 + '.' + angka2 + ' (KHTML, like Gecko) Chrome/' + angka2 + '.0.4280.' + angka1 + ' Safari/' + angka1 + '.' + angka2 + ' Edg/' + angka2 + '.0.' + angka1 + '.75',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/' + angka1 + '.' + angka2 + ' (KHTML, like Gecko) Chrome/' + angka2 + '.0.3538.' + angka1 + ' Safari/' + angka1 + '.' + angka2 + ' Edge/' + angka2 + '.18363',
]
const randomUserAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];


arrJudul = [];
arrTanggal = [];
arrLink = [];
var j = 0;
(async () => {
 
    while (o < 5) {
      var proses = 0
      
      process.stdout.write('Processing Get All News ' + o + ' Of Pages \r');
      let getBerita = await axios({
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent": randomUserAgent
        },
        method: "get",
        url: "https://www.kompas.tv/section/more?sort_by=recent&limit=12&offset=" + o + "&id=&api_url=article_tag&tag=semarang&search=&type=&jsonPath=",
      }).then(function (res) {
        const dom = new JSDOM(res.data);
        for (i = 1; i < 10; i++) {

          //   try{
          judulBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > h2 > a`).textContent
          tanggalBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > span.time-news.p10`).textContent
          linkBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > h2 > a`).getAttribute("href")
          o++
          proses++
          arrJudul.push(judulBerita)
          arrTanggal.push(tanggalBerita)
          arrLink.push(linkBerita)
        }
       
      })
      
    }
  

  console.log("PROCESSING GET NEWS....")

  function getBerita(){
    for(j=0; j<arrJudul.length; j++){
    console.log(arrJudul[j])
          console.log(arrTanggal[j])
          console.log(arrLink[j])
          j++
    }
  }
  let filterpajak =  pajaks.filter(function(pajak) {
    return arrJudul == "Ocean";
  });
  
  console.log(aquaticCreatures);
  //getBerita()

})();
