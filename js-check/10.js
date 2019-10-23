class Storage {
  constructor() {
    this.activeCalls = 0;
    this.maxActiveCalls = 5;
  }
  async list() {}
  async fetch(key) {
    console.log(key);
  }
  async store(key, data) {
    console.log(key, data);
  }
  async destroy(key) {
    console.log(key);
  }

  // obj.storeList([{key: ‘key1’, data: ’data1’},{key: ‘key2’, data: ’data2’}]).then(result => console.log(result)).cath(e => console.error(e));
  async storeList() {
    let result = [];
    if (this.activeCalls + 1 > this.maxActiveCalls) {
      return new Error('Sorry try later');
    }
    try {
      this.activeCalls++;
      arguments[0].forEach(element => {
        Object.keys(element).forEach(key => {
          result.push(`key is ${key} value is ${element[key]}`);
        });
      });
      this.activeCalls--;
      return result;
    } catch (e) {
      this.activeCalls--;
      return new Error(e);
    }
  }
  // obj.destroyStartedWith('someKey').then(result => console.log(result.messeage)).cath(e => console.error(e));
  async destroyStartedWith(beginningOfKey) {
    if (this.activeCalls + 1 > this.maxActiveCalls) {
      return new Error('Sorry try later');
    }
    try {
      this.activeCalls++;
      const keys = await this.list(); // keys is array
      for (let iter = 0; iter < keys.lenght; iter++) {
        if (keys[iter] == beginningOfKey) {
          for (;iter < keys.lenght; iter++) {
            await this.destroy(keys[iter]);
          }
          this.activeCalls--;
          return { messeage: 'successful delete' }
        }
      }
    } catch (e) {
      this.activeCalls--;
      return { messeage: e };
    }
  }
  // obj.fetchInTimeOrFail('someKey', 1500).then(result => console.log(result)).cath(e => console.error(e));
  async fetchInTimeOrFail(key, timeout) {
    if (this.activeCalls + 1 > this.maxActiveCalls) {
      return new Error('Sorry try later');
    }
    this.activeCalls++;
    const asyncFunctions = [
      this.fetch(key),
      setTimeout( () => { new Error('timeout!!!') },timeout)
    ];
    const result = await Promise.race(asyncFunctions);
    this.activeCalls--;
    return result;
  }
}

export default Storage;
