const {task1: noTaskOne, task2: noTaskTwo, task3} = require('./task');

const boot = async () => {
  console.log(noTaskOne.sum(1, 2, 3));
  console.log(await task3);
  console.log(noTaskTwo.planet.getVolume());
};

boot();
