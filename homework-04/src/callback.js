let sum = 0;

function randomNumber() {
  return Math.floor(Math.random() * Math.floor(6));
}

function throwDice(error, num1, num2, end) {
  if (error) {
    console.log(error);
  } else {
    sum += num1 + num2;
    if (end) {
      console.log(`Sum is ${sum}`);
    } else {
      console.log(`number one is ${num1} number two is ${num2}`);
    }
  }
}

function runner(callback) {
  setTimeout(() => {
    let num1 = randomNumber();
    let num2 = randomNumber();
    if (num1 === 0 || num2 === 0) {
      callback(new Error('Lost dise'));
    } else {
      callback(null, num1, num2);
      setTimeout(() => {
        num1 = randomNumber();
        num2 = randomNumber();
        if (num1 === 0 || num2 === 0) {
          callback(new Error('Lost dise'));
        } else {
          callback(null, num1, num2);
          setTimeout(() => {
            num1 = randomNumber();
            num2 = randomNumber();
            if (num1 === 0 || num2 === 0) {
              callback(new Error('Lost dise'));
            } else {
              callback(null, num1, num2, true);
            }
          }, 1000);
        }
      }, 1300);
    }
  }, 700);
}
runner(throwDice);
