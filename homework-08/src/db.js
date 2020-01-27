const fsp = require('fs').promises;

class Database {
  async getData() {
    try {
      const buffer = await fsp.readFile('./db.json');
      this.obj = JSON.parse(buffer.toString());
      return this.obj;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async setData(data) {
    try {
      await fsp.writeFile('./db.json', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = {Database};
