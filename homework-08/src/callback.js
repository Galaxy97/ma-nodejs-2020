/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const http = require('http');

const endpoints = require('./endpoints');

function requestPromise(option, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(option, res => {
      let data = [];
      res.on('data', chunk => {
        data.push(chunk);
      });
      res.on('end', () => {
        data = Buffer.concat(data);
        data = data.toString();
        resolve({res, data});
      });
    });
    req.on('error', e => {
      reject(e);
    });
    // Write data to request body
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports.pollEndpoints = async () => {
  for (const endpoint of endpoints) {
    try {
      console.log('\nStart polling endpoints by callback methods');
      // eslint-disable-next-line no-await-in-loop
      let {res, data} = await requestPromise(endpoint.option, endpoint.body);
      console.log(`Expected: status code ${endpoint.expected.statusCode}`);
      console.log(`RESPONSE: status code ${res.statusCode}`);
      if (res.statusCode !== endpoint.expected.statusCode) {
        console.log('UNEXPECTED STATUS CODE \n');
        let attempt = 1;
        do {
          console.log();
          const resp = await requestPromise(endpoint.option, endpoint.body);
          res = resp.res;
          data = resp.data;
          console.log(`Response: `);
          const resData = JSON.parse(data);
          for (const key in resData) {
            console.log(key, resData[key]);
          }
          sleep(attempt * 100);
          attempt *= 2;
        } while (
          res.statusCode !== endpoint.expected.statusCode &&
          attempt < 512
        );
      }
      console.log(`Expected: `);
      endpoint.expected.responseBody.forEach(obj => {
        console.log(obj.key, obj.value);
      });

      console.log(`Response: `);
      const resData = JSON.parse(data);
      for (const key in resData) {
        console.log(key, resData[key]);
      }
      sleep(1000);
      // eslint-disable-next-line no-await-in-loop
      console.log('--------------------------------------------------------\n');
    } catch (error) {
      console.error(error);
    }
  }
};
