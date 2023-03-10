const delay = require('delay');
const readlineSync = require('readline-sync');
var figlet = require('figlet');
var chalk = require('chalk');
const cheerio = require('cheerio');
const axios = require('axios');
const { stringify, parse } = require('querystring');
const console = require('console');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const { filter, isEmpty, isArray, isUndefined, isString, isNumber } = require('lodash');

console.log(
  chalk.redBright(
    figlet.textSync('SKRIPSIIIII', { horizontalLayout: 'fitted' })
  )
);
var pages = readlineSync.question(chalk.whiteBright('[+] Input jumlah halaman yang diinginkan : '));



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

Judul = [];
Tanggal = [];
Link = [];
let BeritaKey = [];
var halaman = 1;
let validasiFilter = false;
let keyWord,
filtered1,
filtered

(async () => {

  for (halaman = 1; halaman <= pages; halaman++) {
    try {
      process.stdout.write(`[@] Processing Get All News ${halaman}  Of Pages \r`);
      let getBerita = await
        axios({
          // headers: {
          //   // "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          //   // "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          //   // "cache-control": "max-age=0",
          //   // "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
          //   // "sec-ch-ua-mobile": "?0",
          //   // "sec-ch-ua-platform": "\"Windows\"",
          //   // "sec-fetch-dest": "document",
          //   // "sec-fetch-mode": "navigate",
          //   // "sec-fetch-site": "none",
          //   // "sec-fetch-user": "?1",
          //   // "upgrade-insecure-requests": "1",
          //   "user-agent": randomUserAgent
          // }
          method: "get",

          url: "https://www.kompas.tv/section/more?sort_by=recent&limit=12&offset=" + o + "&id=&api_url=article_tag&tag=semarang&search=&type=&jsonPath=",
        }).then(function (res) {
          const dom = new JSDOM(res.data);
          for (i = 1; i <= 12; i++) {
            judulBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > h2 > a`).textContent
            tanggalBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > span.time-news.p10`).textContent
            linkBerita = dom.window.document.querySelector(`body > div:nth-child(${i}) > div.col-70 > h2 > a`).getAttribute("href")
            Judul.push(judulBerita)
            Tanggal.push(tanggalBerita)
            Link.push(linkBerita)
          }
        })
      o = o + 12
    } catch (err) {
      console.log("ERROR GAN MOHON DIULANGI LAGI")
      process.exit()
    }

  }
  function getBerita() {
    console.log("")
    no = 0
    for (r = 0; r < Judul.length; r++) {
      no++
      console.log(chalk.redBright`${no}. ${Judul[r]}`)
      console.log(`  ${Tanggal[r]}`)
      console.log(chalk.blueBright((`  ${Link[r]} \n`)))
    }
    console.log(`\nTotal judul berita dalam ${pages} halaman sebanyak ${pages * 12} judul`)
  }

  function filterBerita() {
    BeritaKey = [];
    keyWord = readlineSync.question(chalk.whiteBright('\n[+] Input kata kunci pencarian           : '));
    const str = keyWord
    const newStr = str.split(' ')
      .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');
    console.log("\n\n========================== Hasil ================================")
    console.log(`[?] Pencarian dengan kata kunci "${keyWord}"`);
    var PATTERN = newStr,
      filtered = Judul.filter(function (str) { return str.includes(PATTERN); });
    // console.log("0"+filtered)
    var PATTERN1 = keyWord,
      filtered1 = Judul.filter(function (str1) { return str1.includes(PATTERN1); });
    // console.log("1"+filtered1)

    if (filtered != "") {
      e = 0
      for (w = 0; w < filtered.length; w++) {
        e++
        // console.log(`${e}. ${filtered[w]}`)
        BeritaKey.push(filtered)
        console.log(`${e}. ${filtered[w]}`)
      }
      validasiFilter = true;
      console.log(`\n[=] Total judul berita dengan keyword "${keyWord}" ${filtered.length} judul`)
      console.log("==================================================================")
    }
    else if (filtered1 != "") {
      e = 0
      for (w = 0; w < filtered1.length; w++) {
        e++
        BeritaKey.push(filtered1)
        console.log(`${e}. ${filtered1[w]}`)
        //console.log(filtered1[w])
      }
      validasiFilter = true;
      console.log(`\n[=] Total judul berita dengan keyword "${keyWord}" ${filtered1.length} judul`)
      console.log("==================================================================")
    } else {
      console.log("Tidak ada data yang cocok")
      console.log("==================================================================")
      menu()
    }
      return BeritaKey
  }
  function percentageOfKey(keyWord) {
    console.log(BeritaKey[0])
    if (validasiFilter == false) {
      console.log("#### input filter kata kunci dulu gan")
    } else {
      console.log(`\n[=] Total judul berita dengan keyword "${keyWord}" ${BeritaKey[0].length} judul`)
      console.log(`[?] Persentase berita dengan kata kunci "${keyWord}" banding semua berita sebanyak ${(BeritaKey[0].length / (pages * 12)*100).toFixed(2)} persen`)
      menu()
    }
  }
  function displayHasil(BeritaKey){
    x=0
    console.log("hasil"+BeritaKey[0])
    console.log(`\n[=] Total judul berita dengan keyword "${keyWord}" ${BeritaKey[0].length} judul`)
    for (w = 0; w < BeritaKey[0].length; w++) {
      x++  
      console.log(`${x}. ${BeritaKey[0][w]}`)
    }
  }
  function deleteNewsFilter() {
    if (validasiFilter == false) {
      console.log("#### input filter kata kunci dulu gan")
      menu()
    } else {
      BeritaKey[0] = [];
      filtered1 = [];
      filtered = [];
      cleanArray = BeritaKey[0].filter(function () { return true });
      cleanArray1 = filtered1.filter(function () { return true });
      cleanArray2 = filtered.filter(function () { return true });
      console.log("\nBerhasil membersihkan hasil filter\n")
    }
  }
  function saveCSV(){

  }

  function filterKriminal(){
    kriminal = ["pencurian", "narkoba", "asusila", "pemerkosaan","pencopetan","penjambretan","senjata","tajam","kekerasan","pengeroyokan","tawuran","begal","perusakan","pembunuhan","bunuh","mutilasi","tewas","korupsi" ]
    const str = keyWord
    const newStr = str.split(' ')
      .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');
    console.log("\n\n========================== Hasil ================================")
    console.log(`[?] Pencarian dengan kata kunci "${keyWord}"`);
    var PATTERN = newStr,
      filtered = Judul.filter(function (str) { return str.includes(PATTERN); });
    // console.log("0"+filtered)
    var PATTERN1 = keyWord,
      filtered1 = Judul.filter(function (str1) { return str1.includes(PATTERN1); });
  }
  function getHasilKriminal(){

  }
  function menu() {
    console.log("\n\n========================== MENU ================================")
    console.log("[1] Ambil semua berita")
    console.log("[2] Filter dengan kata kunci")
    console.log("[3] Mendapatkan persentase berita kata kunci dengan semua berita")
    console.log("[4] Lihat hasil filter")
    console.log("[5] Reset filter")
    console.log("[6] Simpan berita dalam CSV")
    console.log("[7] Mendapatkan hasil persentase berita kriminal")
    console.log("==================================================================")
    var pilihMenu = readlineSync.question(chalk.whiteBright('\n[+] Pilih Menu : '));
    switch (pilihMenu) {
      case "1":
        getBerita()
        menu()
      case "2":
        filterBerita()
        menu()
      case "3":
        percentageOfKey(keyWord)
        menu()
      case "4":
        displayHasil(BeritaKey)
        menu()
      case "5":
        deleteNewsFilter()
        filterBerita()
        menu()
      default:
        menu()
    }
  }
  menu()
})();