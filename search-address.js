const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');
const SearchVal = require('./search-list');

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

  fs.writeFile(`./files/primary school ${Date.now()}.csv`, csv, (err) => {
    if (err) throw err;
    console.log('file saved!');
  });
};

async function multiReq(SearchVal){
  let respJSON = [];
  for (let item of SearchVal){
    respJSON.push(await sendReq(item));
    console.log('status:' + respJSON.length + '/' + SearchVal.length);
  }
  return respJSON;
};

multiReq(SearchVal).then((respJSON)=> writeToFile(respJSON));
