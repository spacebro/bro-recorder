'use strict'

const start = Date.now()

const fs = require('fs')
const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')

const filepath = settings.get('play:filepath') || './library/spacebro-record.json'
const file = fs.readFileSync(filepath, {encoding: 'utf-8'})
const datas = JSON.parse(file)
const events = datas.slice(1) // remove 'start' key
console.log(`reading ${filepath}`)

const host = settings.get('spacebro:host') || '127.0.0.1'
const port = settings.get('spacebro:port') || 8888

const client = new SpacebroClient({
  channelName: settings.get('spacebro:channelName') || '',
  client: {
    name: 'bro-recorder',
    description: 'record spacebro event and write to file'
  },
  verbose: settings.get('verbose') || true
}, false)

client.connect(host, port).then(() => {
  let index = 0

  function emit (prev) {
    const event = events[index]
    const delta = (event.time - prev)

    setTimeout(() => {
      client.emit(event.event, event.datas)
      if (index < (events.length - 1)) {
        index++
        emit(event.time)
      } else {
        console.log('Done.')
        process.exit()
      }
    }, delta)
  }

  emit(0)
})
