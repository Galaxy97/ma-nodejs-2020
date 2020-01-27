const program = require('commander');
const {Database} = require('./db.js');
const callback = require('./callback');
const promise = require('./promise-native');
const axios = require('./axios');

const db = new Database();

const run = async () => {
  const setting = await db.getData();
  program.version('0.0.1');

  program
    .command('mode')
    .description('auto or manual mode cheking api')
    .action(() => {
      console.log(`chosen mode is ${setting.mode}`);
    });
  program
    .command('delay')
    .description('delay time between auto mode cheking api')
    .action(() => {
      console.log(`delay time is ${setting.delay}`);
    });
  program
    .command('method')
    .description('method of cheking api can be: axios or promise or callback')
    .action(() => {
      console.log(setting);
      console.log(`cheking api method is ${setting.method}`);
    });
  program
    .command('run')
    .description('launch cheking api')
    .action(() => {
      // eslint-disable-next-line default-case
      switch (setting.method) {
        case 'callback':
          if (setting.mode === 'manual') {
            console.log(`Polling endpoints ${setting.method}`);
            callback.pollEndpoints();
          }
          if (setting.mode === 'auto') {
            setInterval(() => {
              console.log(`Polling endpoints ${setting.method}`);
              callback.pollEndpoints();
            }, setting.delay);
          }
          break;
        case 'promise':
          if (setting.mode === 'manual') {
            console.log(`Polling endpoints ${setting.method}`);
            promise.pollEndpoints();
          }
          if (setting.mode === 'auto') {
            setInterval(() => {
              console.log(`Polling endpoints ${setting.method}`);
              promise.pollEndpoints();
            }, setting.delay);
          }
          break;
        case 'axios':
          if (setting.mode === 'manual') {
            console.log(`Polling endpoints ${setting.method}`);
            axios.pollEndpoints();
          }
          if (setting.mode === 'auto') {
            setInterval(() => {
              console.log(`Polling endpoints ${setting.method}`);
              axios.pollEndpoints();
            }, setting.delay);
          }
          break;
      }
    });

  program
    .option('--mode [type]', 'auto or maual')
    .option('-d, --delay [integer]', 'integer argument time in delay')
    .option('-m, --method [type]', 'axios or promise or callback');

  program.parse(process.argv);

  if (program.mode) {
    setting.mode = program.mode;
    if (db.setData(setting))
      console.log(`Mode of cheking successful chenged on ${setting.mode}`);
    else console.error('error');
  }
  if (program.delay) {
    setting.delay = program.delay;
    if (db.setData(setting))
      console.log(`delay time successful chenged on ${setting.delay}`);
    else console.error('error');
  }
  if (program.method) {
    setting.method = program.method;
    if (db.setData(setting))
      console.log(`cheking api method chenged on ${setting.method}`);
    else console.error('error');
  }
};

run();
