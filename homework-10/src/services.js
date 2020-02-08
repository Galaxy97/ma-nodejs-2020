const dataBase = require('./db');

module.exports.addRecord = async (login, password) => {
  try {
    const res = await dataBase('users')
      .insert({login, password})
      .returning('id');
    return res[0];
  } catch (error) {
    return error;
  }
};
module.exports.getRecord = async ({
  id = 0,
  login = '',
  password = '',
  token = '',
}) => {
  try {
    if (token.length === 36) {
      const res = await dataBase
        .from('users')
        .select()
        .Where({token});
      return res[0];
    }
    const res = await dataBase
      .from('users')
      .where({id: Number(id)})
      .orWhere({login, password});
    return res[0];
  } catch (error) {
    return error;
  }
};
module.exports.editRecord = async ({id, login, password, token}) => {
  try {
    const update = {};
    if (login) update.login = login;
    if (password) update.password = password;
    if (token.length === 36) {
      const res = await dataBase('users')
        .where({token})
        .update(update);
      return res;
    }
    const res = await dataBase('users')
      .where({id})
      .update(update);
    return res;
  } catch (error) {
    return error;
  }
};

module.exports.deleteRecord = async ({id, token}) => {
  try {
    if (token.length === 36) {
      const res = await dataBase('users')
        .where({token})
        .del();
      return res;
    }
    const res = await dataBase('users')
      .where({id})
      .del();
    return res;
  } catch (error) {
    return error;
  }
};

module.exports.getBodyFromRequest = req => {
  return new Promise((resolve, reject) => {
    let body = []; // -------------------------------------- parse body POST req
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      try {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};
