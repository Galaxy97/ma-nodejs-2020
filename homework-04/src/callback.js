let sum = 0;

function randomNumber() {
  return Math.floor(Math.random() * Math.floor(6));
}

function throwDice(callback) {
  const num1 = randomNumber();
  const num2 = randomNumber();
  if (num1 === 0 || num2 === 0) {
    callback(new Error('Lost dise'));
  } else {
    callback(null, num1, num2);
  }
}

setTimeout(() => {
  throwDice((error, num1, num2) => {
    if (error) {
      console.log(error);
    } else {
      sum += num1 + num2;
      console.log(`number one is ${num1} number two is ${num2}`);
      setTimeout(() => {
        // eslint-disable-next-line no-shadow
        throwDice((error, num1, num2) => {
          if (error) {
            console.log(error);
          } else {
            sum += num1 + num2;
            console.log(`number one is ${num1} number two is ${num2}`);
            setTimeout(() => {
              // eslint-disable-next-line no-shadow
              throwDice((error, num1, num2) => {
                if (error) {
                  console.log(error);
                } else {
                  sum += num1 + num2;
                  console.log(`Sum is ${sum}`);
                }
              });
            }, 700);
          }
        });
      }, 1300);
    }
  });
}, 700);
