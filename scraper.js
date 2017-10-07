/*jshint esversion: 6 */ /*globals $:false */

(function () {
'use strict';
  //Choose and use third-party npm packages
  var json2csv = require('json2csv');
  var request = require('request');
  var cheerio = require('cheerio');
  var fs = require('fs'); // node file system
  //date and time
  const d = new Date();
  const month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  const date = d.getUTCFullYear() + "-" + month[d.getMonth()] + "-" + d.getDate();
  const hours = d.getHours();
  const mins = d.getMinutes();
  const secs = d.getSeconds();
  const time = `${hours}:${mins}:${secs}`;
  //check for a folder called ‘data’.--If the folder doesn’t exist, the scraper should create one.--else do nothing
  if(!fs.existsSync('./data/')){
      fs.mkdirSync('./data/');
    }
  //scraper visits website http://shirts4mike.com -- uses http://shirts4mike.com/shirts.php as single entry point
  //scrape information for 8 tee-shirts from the site, without using any hard-coded urls
  var baseURL = 'http://www.shirts4mike.com/';
  var shirtsURLext = 'shirts.php';
  var entryURL = `${baseURL}${shirtsURLext}`;
  var shirts, theArray = [];
  //get the shirt url extensions -- /use shirt extensions to get shirt info
  request(entryURL, function(error, response, html){
    if(error){
      fs.appendFileSync(`scraper-error.log`, ` [ ${new Date()} ] <  [scraper error URL issue or website down] ${error} > ,\n`);
      console.log('error logged to: scraper-error.log \n URL issues or website is down');
      return;
    }
    if(!error){
      var $ = cheerio.load(html);
      // The shirts href's , ......................................................
      $('.products li').filter(function(){
        var data = $(this);
        shirts = data.children().attr("href");
        theArray.push(shirts);
      });
    }
    var ImageURL, url, price, title;
    var shirtArray = theArray.slice();
    var breaker = 0;
    //the for loop, loops through the shirt array urls to get seperate shirt info
    for (let i = 0; i < theArray.length; i++) {
      url = `${baseURL}${shirtArray[i]}`;
      var jsonArray = [];
      //request gets the individual shirt info through the individual urls
      request(url, function(error, response, html){
        //logs an error if one occurs
        if(error){
          fs.appendFileSync(`scraper-error.log`, `[ ${new Date()} ] <  [scraper error URL# ${i} ${url} issue or website down] ${error} > ,\n`);
          console.log(`error url# ${i} ${url} logged to: scraper-error.log \n URL issues or website is down`);
          return;
        }
        if(!error){
          var $ = cheerio.load(html);
          var json = { number : "", title : "", price : "", ImageURL : "", myURL : "", date : ""};
          // number, used for filtering shirt order ......................
          json.number = i + 1;
          // Title, ......................................................
          $('.shirt-picture span img').filter(function(){
            var data = $(this);
            title = data.attr("alt");
            json.title = title;
          });
          //Price,  ......................................................
          $('.price').filter(function(){
            var data = $(this);
            price = data.text();
            json.price = price;
          });
          //ImageURL, ....................................................
          $('.shirt-picture img').filter(function(){
            var data = $(this);
            ImageURL = data.attr("src");
            json.ImagexURL = ImageURL;
          });
          //URL,  ......................................................
          json.myURL = `http://www.shirts4mike.com/${shirtArray[i]}`;
          //and Time  ...................................................
          json.date= `${date} ${time}`;
          //push all shirt info into the json-array
          jsonArray.push(json);
        }
        //save price, title, url and image url into a CSV file
        var fields = [ "number", "title", "price", "ImageURL", "myURL", "date"];                                                                           //   }
        var csv = json2csv({ data: jsonArray, fields: fields });
        // write(csv);
        fs.writeFile(`./data/${date}.csv`, csv, function(err) {
          if (err) throw err;
        });
      });//the end of the inner request function
    }//the end of the for function
  });//the end of the first request function
}());
