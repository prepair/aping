require('dotenv').config()
const request = require('request')
const chalk = require('chalk')

let sid = process.env.SID || process.argv[2]
let apiUrlPostfix = (process.argv[3] || '').toUpperCase()
let apiUrlEnv = 'API_URL' + (apiUrlPostfix ? `_${apiUrlPostfix}` : '')
let apiUrl = process.env[apiUrlEnv]
let timeout = parseInt(process.env.TIMEOUT, 10) || 60 * 1000 * 5
let endpoint = process.env.ENDPOINT || '/customer/customeraccounthistory ' // we love profile pages

if (!sid) {
  console.error('SID not set.')
  process.exit(1)
}

if (!apiUrl) {
  console.error(`${apiUrlEnv} not set.`)
  process.exit(1)
}

let options = {
  method: 'GET',
  url: `API_URL${apiUrl}${endpoint}`,
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
