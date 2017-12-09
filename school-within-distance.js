let getDistance = require('./within-distance');
let primarySchool = require('./files/primary-school');
let hdb = require('./files/hdb')


const HDB = hdb[process.argv[2]];

console.log(HDB);

let
  schoolWithin1km = [],
  schoolWithin1to2km = [];

// To loop the school list
for (let school of primarySchool) {
  let distance = getDistance(
    HDB.LATITUDE, HDB.LONGITUDE,
    school.LATITUDE, school.LONGITUDE);
  
  school.distance = distance;
  
  if (distance <= 1) {
    schoolWithin1km.push(school);
  }
  else if (distance <= 2) {
    schoolWithin1to2km.push(school);
  }
}

console.clear();
console.log('Find schools near: ' + HDB.ADDRESS)
console.log('\n');
console.log('Schools within 1km:');
for (let school of schoolWithin1km) {
  console.log(school.SEARCHVAL + ' (' + school.distance.toFixed(2) + ' km)');
}
console.log('\n');
console.log('Schools between 1-2km:');
for (let school of schoolWithin1to2km) {
  console.log(school.SEARCHVAL + ' (' + school.distance.toFixed(2) + ' km)');
}