/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const rpn = require('request-promise-native');
const endpoints = require('./endpoints');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports.pollEndpoints = async () => {
  for (const endpoint of endpoints) {
    try {
      console.log('\nStart polling endpoints by promise-native methods');

      const option = {
        uri: `http://${endpoint.option.host}:${endpoint.option.port}${endpoint.option.path}`,
        method: endpoint.option.method,
        headers: endpoint.option.headers || '',
      };
      if (endpoint.body) option.body = endpoint.body;

      try {
        // eslint-disable-next-line no-await-in-loop
        let response = await rpn(option);
        console.log(`Expected: status code ${endpoint.expected.statusCode}`);
        console.log(`RESPONSE: status code 200`);

        console.log(`Expected: `);
        endpoint.expected.responseBody.forEach(obj => {
          console.log(obj.key, obj.value);
        });

        console.log(`Response: `);
        response = JSON.parse(response);
        console.log(response);
        sleep(1000);
        console.log(
          '--------------------------------------------------------\n',
        );
      } catch (response) {
        console.log(`Expected: status code ${endpoint.expected.statusCode}`);
        console.log(`RESPONSE: status code ${response.statusCode}`);
        console.log(`Expected: `);
        endpoint.expected.responseBody.forEach(obj => {
          console.log(obj.key, obj.value);
        });
        console.log(`RESPONSE: `);
        console.log(response.error);
        if (endpoint.expected.statusCode !== response.statusCode) {
          console.log('RETRY CONNECTION');
          let retry = true;
          while (retry) {
            try {
              let resp = await rpn(option);
              retry = false;
              console.log(`RESPONSE: status code 200`);
              console.log(`Response: `);
              resp = JSON.parse(resp);
              console.log(resp.messeage);
            } catch (error) {
              console.log('retry');
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
