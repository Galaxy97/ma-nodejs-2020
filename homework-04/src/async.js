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

(async () => {
  try {
    let result = await runner(700);
    let sum = result.num1 + result.num2;
    console.log(`throw one is ${result.num1} throw two is ${result.num2}`);
    result = await runner(1300);
    sum += result.num1 + result.num2;
    console.log(`throw one is ${result.num1} throw two is ${result.num2}`);
    result = await runner(1000);
    sum += result.num1 + result.num2;
    console.log(`sum is ${sum}`);
  } catch (e) {
    console.error(e);
  }
})();
