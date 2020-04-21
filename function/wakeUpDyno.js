var fetch = require("node-fetch");
var toTimestamp = require("./toTimestamp");
var firebase = require('../config/firebase.config');

var db = firebase.database();


const wakeUpDyno = (url, interval = 1, callback) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    try {
      console.log(`setTimeout called.`);
      var timestamp = toTimestamp(new Date())
      var ref = db.ref(`/time/${timestamp}`);
      ref.push({timestamp});
      // HTTP GET request to the dyno's url
      fetch(url).then(() => console.log(`Fetching ${url}.`));
    } catch (err) {
      // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} 
            Will try again in ${interval} minutes...`);
    } finally {
      try {
        callback(); // execute callback, if passed
      } catch (e) {
        // catch callback error
        callback ? console.log("Callback failed: ", e.message) : null;
      } finally {
        // do it all again
        return wakeUpDyno(url, interval, callback);
      }
    }
  }, milliseconds);
};

module.exports = wakeUpDyno;
