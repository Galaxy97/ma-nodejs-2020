class Planet {
  constructor(name, diametr) {
    this.name = name;
    this.volume = ((1 / 6) * Math.PI * diametr ** 3).toFixed(2);
  }

  getVolume() {
    return `Планета ${this.name} має об'єм ${this.volume}`;
  }
}

const planet = new Planet('Mars', 12);

module.exports = {planet};
