const url = require('url');
const services = require('./services');

module.exports.handle = async (req, res) => {
  const requestUrl = url.parse(req.url, true);
  if (req.method === 'GET' && requestUrl.pathname === '/users') {
    try {
      const record = await services.getRecord(requestUrl.query);
      res.end(JSON.stringify(record));
    } catch (error) {
      res.code(400).end();
    }
  }
  if (req.method === 'POST' && req.url === '/users') {
    try {
      const body = await services.getBodyFromRequest(req);
      const id = await services.addRecord(body.login, body.password);
      res.end(JSON.stringify({id}));
    } catch (error) {
      res.code(400).end();
    }
  }
  if (req.method === 'PUT' && req.url === '/users') {
    try {
      const body = await services.getBodyFromRequest(req);
      await services.editRecord(body);
      res.end('ok');
    } catch (error) {
      res.code(400).end();
    }
  }
  if (req.method === 'DELETE' && req.url === '/users') {
    try {
      const body = await services.getBodyFromRequest(req);
      console.log(body);
      await services.deleteRecord(body);
      res.end('ok');
    } catch (error) {
      res.code(400).end();
    }
    res.end('DELETE');
  }
};
