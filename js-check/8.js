class Planet {
    constructor(name, diametr) {
        this.name = name;
        this.volume = (1/6 * Math.PI * Math.pow(diametr, 3)).toFixed(2);
    }

    display() {
        console.log(`Планета ${this.name} має об'єм ${this.volume}`);
    }
}

const planet = new Planet('Mars', 12);
planet.display();

class EarthClass extends Planet {}

const earth = new EarthClass('Earth', 45);

earth.display();