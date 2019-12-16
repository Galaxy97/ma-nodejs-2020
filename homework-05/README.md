# Node.js homework
Modules: fs, buffer, path, zlib and URL.

### provided input: compressed JSON files `./input/*.json.gz`

file: `flash.json.gz`
```
{
    "file": "./devices/flash-drives.xls",
    "url": "http://example.com/files/devices/flash-drives.xls"
}
```

file: `keyboard.json.gz`
```
{
    "file": "./devices/keyboards.xls",
    "url": "http://example.com/files/devices/keyboards.xls"
}
```

file: `monitor.json.gz`
```
{
    "file": "./devices/monitors.xls",
    "url": "http://example.com/files/devices/monitors.xls"
}
```

### expected output: single compressed JSON file `./output/result.json.gz`
```
{
  "flash": {
    "file": "./devices/flash-drives.xls",
    "url": "https://example.com/devices?file=flash-drives&type=.xls"
  },
  "keyboard": {
    "file": "./devices/keyboards.xls",
    "url": "https://example.com/devices?file=keyboards&type=.xls"
  },
  "monitor": {
    "file": "./devices/monitors.xls",
    "url": "https://example.com/devices?file=monitors&type=.xls"
  }
}
```
* Use file names as category names in output JSON file 
  * `flash.json.gz` => `"flash": { ...content... }`
  * `keyboard.json.gz` => `"keyboard": { ...content... }`