const app = require('express')()
const server = require('http').createServer(app)
const tmi = require('tmi.js')
const arknightsAutomationFn = require('./arknightsAutomation')

const { parse } = require('./parser')

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const port = 4001

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})

io.on('connection', client => {
  client.on('playStage', payload => {
    console.log('payload', payload)

    // add authentication?
    const client = new tmi.Client({
      channels: ['eango_']
    })

    client.connect()

    client.on('message', (channel, tags, message, self) => {
      if (self) return true
      console.log(`${tags['display-name']}: ${message}`)
      const result = parse(message)
      result && arknightsAutomationFn[result.fn](...result.args, map)
    })
  })
})
