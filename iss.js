const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let url1 = "https://api.ipify.org?format=json";
  let data;
  request(url1 , (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    data = JSON.parse(body);
    callback(null,data.ip);
  });
};

//module.exports = { fetchMyIP };

const fetchCoordsByIP = function(ip, callback) {
  let url1 = "https://ipvigilante.com/" + ip;
  let data;
  request(url1 , (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    data = JSON.parse(body);
    let lat = data.data.latitude;
    let lon = data.data.longitude;
    callback(null,lat,lon);
  });
};

//module.exports = { fetchCoordsByIP };


const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  let url1 = "http://api.open-notify.org/iss-pass.json?lat=" + coords.lat + "&lon=" + coords.lon;
  let data;
  console.log(url1);
  request(url1 , (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    data = JSON.parse(body).response;
    callback(null,data);
  });
};

//module.exports = { fetchISSFlyOverTimes };

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  let latlong = {};
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error,null);
      return;
    }
    fetchCoordsByIP(ip, (error,lat,lon) => {
      if (error) {
        callback(error,null);
        return;
      }
      latlong = {lat,lon};
      console.log(latlong);
      fetchISSFlyOverTimes(latlong ,(error,passtimes) => {
        if (error) {
          callback(error,null);
          return;
        }
        callback(null,passtimes);
        return;
      });
    });
  });
  
};
module.exports = { nextISSTimesForMyLocation };