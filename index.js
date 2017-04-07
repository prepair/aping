require('dotenv-safe').load({allowEmptyValues: true})
const request = require('request')
const chalk = require('chalk')

let sid = process.env.SID || process.argv[2]
let apiUrl = process.env.API_URL
let timeout = parseInt(process.env.TIMEOUT, 10) || 60 * 1000 * 5
let endpoint = process.env.ENDPOINT || '/asset/yellowRibbon' // we love yellow ribbons

if (!sid) {
  throw new Error('SID not set.')
}

let options = {
  method: 'GET',
  url: `${apiUrl}${endpoint}`,
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    accept: 'application/json',
    cookie: `ASP.NET_SessionId=${sid};`
  },
  json: true
}
let i = 0
console.log(`Pinging ${apiUrl} with sid ${sid}.\n`)
setInterval(() => {
  request(options, (error, response, body) => {
    let timestamp = (new Date()).toISOString().substring(0, 19).replace('T', ' ')
    if (error) {
      console.error(error)
    } else {
      console.log(`${chalk.green(timestamp)} - ${i++}. sid ${chalk.yellow(sid)}, response body is ${body ? 'empty' : 'valid json'}.`)
    }
  })
}, timeout)
