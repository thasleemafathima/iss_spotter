// index.js
//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');

//const { fetchISSFlyOverTimes } = require("./iss");

/*let finalip;
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  finalip = ip;
  console.log('It worked! Returned IP:' , ip);
});*/

/*fetchCoordsByIP("162.245.144.188", (error,lat,lon) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates' , lat,lon);
});
*/

/*fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' } ,(error,passtimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover times:' , passtimes);
});*/

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});