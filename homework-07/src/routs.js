/* eslint-disable no-case-declarations */
const url = require('url');
const services = require('./services');

const config = require('./config');

// const base64 = ;

const responseFunc = (res, code, body) => {
  res.writeHead(code, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(body));
};

const handle = (req, res) => {
  // authorization
  if (req.headers.authorization !== config.base64) {
    responseFunc(res, 401, {
      message: 'Unauthorized',
    });
  }
  switch (req.method) {
    case 'GET':
      const requestUrl = url.parse(req.url, true);
      switch (requestUrl.pathname) {
        case '/metrics':
          const result = services.handleMetrics(requestUrl.query);
          responseFunc(res, result.code, result.body);
          break;
        case '/random':
          const randomres = services.randomHandler();
          responseFunc(res, randomres.code, randomres.body);
          break;
        default:
          responseFunc(res, 404, {
            message: 'rout no found',
          });
          break;
      }
      break;
    case 'POST':
      switch (req.url) {
        case '/limit':
          services.handleLimit(req).then(result => {
            responseFunc(res, result.code, result.body);
          });
          break;
        default:
          responseFunc(res, 404, {
            message: 'rout no found',
          });
          break;
      }
      break;
    default:
      responseFunc(res, 404, {
        message: 'rout no found',
      });
      break;
  }
};

module.exports = {handle};
