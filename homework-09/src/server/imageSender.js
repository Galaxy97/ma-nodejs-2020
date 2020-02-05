const {pipeline, Transform} = require('stream');
const fs = require('fs');
const config = require('../config');

class Limited extends Transform {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.metrics = 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encrypt, callback) {
    const delay = chunk.length / config.limit;
    this.metrics += chunk.length;
    if (this.metrics >= 1048576) {
      process.stdout.write('.');
      this.metrics = 0;
    }
    setTimeout(() => {
      this.push(chunk);
      callback();
    }, delay * 1000);
  }
}

const readFile = fs.createReadStream(config.filePath);
const speedLimit = new Limited();
module.exports.sendJPEG = res => {
  pipeline(readFile, speedLimit, res, err => {
    if (err) console.error(err);
    console.log('succesful');
  });
};
