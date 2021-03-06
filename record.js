'use strict'

const start = Date.now()

const fs = require('fs')
const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')

const overwrite = settings.get('record:overwrite') || false

const folder = settings.get('record:folder') || './library'
let filename = settings.get('record:filename') || 'spacebro-record'
!overwrite && (filename += `-${Date.now()}`)
const filepath = `${folder}/${filename}.json`

const file = fs.createWriteStream(filepath)
file.write(`[${start}`)

let events = settings.get('record:events') || ['*']
(!Array.isArray(events)) && (events = [events])

const client = new SpacebroClient({
  host: settings.get('spacebro:host') || '127.0.0.1',
  port: settings.get('spacebro:port') || 8888,
  channelName: settings.get('spacebro:channelName') || '',
  client: {
    name: 'bro-recorder',
    description: 'record spacebro event and write to file'
  },
  verbose: settings.get('verbose') || true
})

console.log(`writing to ${filepath}`)

for (let i = 0; i < events.length; i++) {
  const event = events[i]
  client.on(event, (datas) => {
    const time = (Date.now() - start)
    file.write(',')
    const eventDatas = { event, datas, time }
    file.write(JSON.stringify(eventDatas))
  })
}

client.on('bro-recorder-stop', quit)
process.on('SIGINT', quit)
process.on('SIGTERM', quit)

function quit () {
  client.disconnect()
  file.write(']')
  file.end()
  console.log(`\nfile written to ${filepath}`)
  process.exit()
}
