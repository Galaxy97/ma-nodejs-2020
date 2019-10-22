const obj1 = {
  name: "Object A"
};

const obj2 = new Object();
obj2.name = "Object B";

function makeUser(name) {
  return {
    name
  };
}

class NewObject {
  constructor(name) {
    this.name = name;
  }
}

const obj3 = makeUser('Object C');

const obj4 = new NewObject('Object D')

console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log(obj4);
