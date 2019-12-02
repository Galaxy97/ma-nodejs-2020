let sum = 0;

function throwDice() {
  return Math.floor(Math.random() * Math.floor(6));
}

function runner(time, last) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num1 = throwDice();
      const num2 = throwDice();
      if (!num1 || !num2) {
        reject(Error(`Lost dice`));
      } else if (last) {
        resolve({num1, num2});
      } else {
        resolve({num1, num2});
      }
    }, time);
  });
}

runner(700)
  .then(result => {
    sum += result.num1 + result.num2;
    console.log(`throw one is ${result.num1} throw two is ${result.num2}`);
    return runner(1300);
  })
  .then(result => {
    sum += result.num1 + result.num2;
    console.log(`throw one is ${result.num1} throw two is ${result.num2}`);
    return runner(1000);
  })
  .then(result => {
    sum += result.num1 + result.num2;
    console.log(`sum is ${sum}`);
  })
  .catch(e => {
    console.error(e);
  });
