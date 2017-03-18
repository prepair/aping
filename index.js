var request = require('request');
var sid = process.env.SID;
var apiUrl = process.env.API_URL;
var timeout = parseInt(process.env.TIMEOUT, 10) || 60 * 1000 * 5;
var endpoint = process.env.ENDPOINT || '/asset/yellowRibbon'; // we love yellow ribbons
var options = {
  method: 'GET',
  url: `${apiUrl}${endpoint}`,
  headers: { 'cache-control': 'no-cache', 'content-type': 'application/json', accept: 'application/json', cookie: `ASP.NET_SessionId=${sid};` },
  json: true
};
let i = 0;
console.log(`Pinging ${apiUrl} with sid ${sid}.`);
setInterval(() => {
  request(options, (error, response, body) => {
    if (error) console.error(error);
    console.log(i++, typeof body);
  });
}, timeout);
