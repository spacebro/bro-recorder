# bro-rercorder

Utility for recording and play back a series of spacebro events.

### Usage

bro-rercorder is meant to be used as is. You install it, provide a custom configuration file and run it.

##### Install
```sh
$ git clone git@github.com:spacebro/bro-rercorder.git
$ cd bro-rercorder/
$ npm i
```

##### Eventually use custom settings
```sh
$ cp settings/settings.default.js settings/settings.js
$ vim settings/settings.js
```

### Settings

```js
{
{
  "verbose": false, // does bro-rercorder logs everything or not
  "record": {
    "events": ["*"],
    // an array of event names to listen to. you can use a wildcard,
    // but bro-recorder won't be able to write the event name in the file
    "folder": "./library", // path the folder where you want to write your files
    "filename": "bro-recorder", // name of the file (no extension, bro-record will append '.json')
    "overwrite": false
    // if set to false, bro-recorder will add a timestamp to the filename
    // so you can keep versions of your recording. if not, bro-recorder will simply overwrite the file.
  },
  "play": {
    "filepath": "./library/bro-recorder.json" // path to the recording file
  },
  "spacebro": {
    "host": "127.0.0.1", // host of your spacebro server
    "port": 8888, // port of your spacebro server
    "channelName": "bro-record" // channel name you want to use (optionnal)
  }
}
```
