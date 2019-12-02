const timeArr = [700, 2000, 3000];
let sum = 0;

function throwDice() {
  return Math.floor(Math.random() * Math.floor(6));
}

function runner(callback) {
  timeArr.forEach((time, index) => {
    setTimeout(() => {
      const num1 = throwDice();
      const num2 = throwDice();
      if (!num1 || !num2) {
        callback(Error(`Lost dice`));
      } else if (index === 2) {
        callback(null, {num1, num2, last: true});
      } else {
        callback(null, {num1, num2});
      }
    }, time);
  });
}
runner((e, result) => {
  if (e) {
    throw e;
  }
  sum += result.num1 + result.num2;
  if (result.last) {
    console.log(`sum is ${sum}`);
  } else {
    console.log(`throw one is ${result.num1} throw two is ${result.num2}`);
  }
});
