// const dataBase = require('./db');
const crypto = require('crypto');
const sequelize = require('sequelize');

const {User} = require('./models');

module.exports.addRecord = async (login, password) => {
  try {
    const res = await User.create({
      login,
      password,
      token: crypto
        .createHash('md5')
        .update(login + password)
        .digest('hex'),
    });
    return res;
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
    const res = await User.findOne({
      where: sequelize.or({id}, {token}, {login, password}),
    });
    return res;
  } catch (error) {
    return error;
  }
};
module.exports.editRecord = async ({id = 0, login, password, token = ''}) => {
  try {
    const update = {};
    if (login) update.login = login;
    if (password) update.password = password;
    const res = await User.update(update, {
      where: sequelize.or({id}, {token}),
    });
    return res;
  } catch (error) {
    return error;
  }
};

module.exports.deleteRecord = async ({id = 0, token = ''}) => {
  try {
    const res = await User.destroy({
      where: sequelize.or({id}, {token}),
    });
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
