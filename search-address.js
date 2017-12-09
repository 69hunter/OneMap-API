const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');
// const SearchVal = require('./files/primary-school-search-list');
const SearchVal = require('./files/hdb-search-list');

function sendReq(SearchText){
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url:`https://developers.onemap.sg/commonapi/search?searchVal=${SearchText}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
      json:true
    }
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body.results[0]); // Print the HTML for the Google homepage.
      if(body.results[0]){
        resolve(body.results[0]);
      }
      else(
        resolve({'SEARCHVAL': SearchText})
      )
    });
  });
};

async function multiReq(SearchVal) {
  let respJSON = [];
  for (let item of SearchVal) {
    respJSON.push(await sendReq(item));
    console.log('status:' + respJSON.length + '/' + SearchVal.length);
  }
  return respJSON;
};

function writeToFile(respJSON){
  let fields = [
    'SEARCHVAL',
    'BLK_NO',
    'ROAD_NAME',
    'BUILDING',
    'ADDRESS',
    'POSTAL',
    'X',
    'Y',
    'LATITUDE',
    'LONGITUDE',
    'LONGTITUDE'];
  let address = respJSON;
  let csv = json2csv({ data: address, fields: fields });
  let jsonContent = JSON.stringify(respJSON);

  fs.writeFile(`./files/address info ${Date.now()}.csv`, csv, (err) => {
    if (err) throw err;
    console.log('file saved!');
  });

  fs.writeFile(`./files/address info ${Date.now()}.json`, jsonContent, 'utf8', (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

};

multiReq(SearchVal).then((respJSON)=> writeToFile(respJSON));
