/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const endpoints = require('./endpoints');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports.pollEndpoints = async () => {
  for (const endpoint of endpoints) {
    try {
      console.log('\nStart polling endpoints by axios methods');

      const option = {
        url: `http://${endpoint.option.host}:${endpoint.option.port}${endpoint.option.path}`,
        method: endpoint.option.method,
        headers: endpoint.option.headers || '',
      };
      if (endpoint.body) option.data = endpoint.body;
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await axios(option);
        console.log(`Expected: status code ${endpoint.expected.statusCode}`);
        console.log(`RESPONSE: status code 200`);

        console.log(`Expected: `);
        endpoint.expected.responseBody.forEach(obj => {
          console.log(obj.key, obj.value);
        });
        console.log(`Response: `);
        console.log(response.data);
        sleep(1000);
        console.log(
          '--------------------------------------------------------\n',
        );
      } catch (response) {
        console.log(`Expected: status code ${endpoint.expected.statusCode}`);
        console.log(`RESPONSE: status code ${response.response.status}`);
        console.log(`Expected: `);
        endpoint.expected.responseBody.forEach(obj => {
          console.log(obj.key, obj.value);
        });
        console.log(`RESPONSE: `);
        console.log(response.response.statusText);
        if (endpoint.expected.statusCode !== response.response.status) {
          console.log('RETRY CONNECTION');
          let retry = true;
          let attempt = 1;
          while (retry && attempt <= 512) {
            try {
              const resp = await axios(option);
              retry = false;
              console.log(`RESPONSE: status code 200`);
              console.log(`Response: `);
              console.log(resp.data);
              await sleep(attempt * 100);
            } catch (error) {
              attempt *= 2;
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
