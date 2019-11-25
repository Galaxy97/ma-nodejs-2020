let number = 3;
let biggestNum = 3;

function isSimple(num) {
  let i = 2;
  while (i < num) {
    const r = num % i;
    if (r === 0) {
      return false;
    }
    i++;
  }
  return true;
}

setInterval(() => {
  if (isSimple(number)) {
    biggestNum = number;
  }
  number++;
}, 0);

setInterval(() => {
  console.log(
    `${new Date().getTime()} -- IN PROCESS -- Biggest prime number found:${biggestNum}`,
  );
}, 1000);
