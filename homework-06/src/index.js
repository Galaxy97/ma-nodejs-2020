const os = require('os');

let RATE = process.env.RATE ? process.env.RATE : 1000;
let LIMIT = process.env.LIMIT ? process.env.LIMIT : 300;
let COLOR = process.env.COLOR ? process.env.COLOR : true;

process.argv.forEach(element => {
  if (/--rate=\d*/.test(element)) {
    RATE = element.slice(7);
  }
  if (/--limit=\d*/.test(element)) {
    LIMIT = element.slice(8);
  }
  if (/--color=true|false/.test(element)) {
    // eslint-disable-next-line no-unneeded-ternary
    COLOR = element.slice(8) === 'true' ? true : false;
  }
});

let oldMem = 0;

setInterval(() => {
  const total = Math.round((os.totalmem() / 1024 / 1024) * 1000) / 1000;
  const free = Math.round((os.freemem() / 1024 / 1024) * 1000) / 1000;
  const thsMem = Math.round((total - free) * 1000) / 1000;
  const delta = Math.round((thsMem - oldMem) * 1000) / 1000;
  oldMem = thsMem;
  console.clear();
  console.log(`Total system memory: ${total} MB`);
  console.log(`Free memory available: ${free} MB`);
  console.log(`Allocated memory: ${thsMem} MB`);
  if (COLOR) {
    if (delta) {
      console.log('\x1b[32m', `delta : ${delta} MB`, '\x1b[37m');
    } else {
      console.log('\x1b[31m', `delta : ${delta} MB`, '\x1b[37m');
    }
  } else {
    console.log(`Delta: ${delta} MB`);
  }
  if (free < LIMIT) {
    if (COLOR) {
      console.log(
        '\x1b[31m',
        '!!! ATTENTION: Available memory is under the defined limit !!!',
        '\x1b[37m',
      );
    } else {
      console.log(
        '!!! ATTENTION: Available memory is under the defined limit !!!',
      );
    }
  }
}, RATE);
