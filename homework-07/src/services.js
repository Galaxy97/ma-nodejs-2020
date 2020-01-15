const os = require('os');

let limit = 2000;

const getMetricsData = parametr => {
  const data = {
    total: Math.round((os.totalmem() / 1024 / 1024) * 1000) / 1000,
    free: Math.round((os.freemem() / 1024 / 1024) * 1000) / 1000,
  };
  data.allocated = Math.round((data.total - data.free) * 1000) / 1000;
  if (parametr) {
    return data[parametr];
  }
  return data;
};

const getBodyFromRequest = req => {
  return new Promise((resolve, reject) => {
    let body = []; // --------------------------------------------------------- parse body POST req
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      try {
        body = Buffer.concat(body);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

const handleLimit = async req => {
  try {
    const buffer = await getBodyFromRequest(req);
    let data = buffer.toString();
    data = JSON.parse(data);
    if (data && data.limit) {
      if (typeof data.limit === 'string' || typeof data.limit === 'number') {
        try {
          limit = Number(data.limit);
          return {
            code: 200,
            body: {
              messeage: `Minimum free memory limit is successfully set to ${limit} MB`,
            },
          };
        } catch (error) {
          return {
            code: 400,
            body: {
              messeage:
                'New value for minimum free memory limit is not valid number',
            },
          };
        }
      }
    }
    return {
      code: 400,
      body: {
        messeage: 'New value for minimum free memory limit is not valid number',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      body: {messeage: 'Internal error occured'},
    };
  }
};

const handleMetrics = query => {
  try {
    const metrics = getMetricsData();
    const result = {};
    if (metrics.free < limit) {
      result.messeage = 'Available memory is under the defined limit';
    }
    if (query.filter) {
      result[query.filter] = metrics[query.filter];
    } else {
      Object.keys(metrics).forEach(key => {
        result[key] = metrics[key];
      });
    }
    return {
      code: 200,
      body: result,
    };
  } catch (error) {
    return {
      code: 500,
      body: {messeage: 'Internal error occured'},
    };
  }
};

module.exports = {getMetricsData, handleLimit, handleMetrics, limit};
