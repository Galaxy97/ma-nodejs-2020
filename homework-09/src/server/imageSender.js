const fs = require('fs');
const config = require('../config');

function sendJPEG(res) {
  const stream = fs.createReadStream(config.filePath);
  let used = 0;
  let usedForOutput = 0;
  const interval = setInterval(() => {
    if (stream.isPaused()) stream.resume();
    used = 0;
  }, 1000);
  process.stdout.write('Start');
  stream
    .on('data', chunk => {
      res.write(chunk);
      if (used + chunk.length > config.limit) {
        stream.pause();
      } else {
        used += chunk.length;
        usedForOutput += chunk.length;
        if (usedForOutput >= 1048576) {
          process.stdout.write('.');
          usedForOutput = 0;
        }
      }
    })
    .on('close', () => {
      process.stdout.write('END \n');
      clearInterval(interval);
      res.end();
    })
    .on('error', error => {
      console.error('Failed to send image buffer!', error.stack);
      res.emit('error', new Error('Failed to send image!'));
    });
}

module.exports = {
  sendJPEG,
};
