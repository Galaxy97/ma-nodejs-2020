let number = 3000;
let biggestNum = 3;
let completed = true;
const limit = 5000;
let lastNumber = 0;

function isSimple(num) {
  let iter = 0;
  let i = completed ? 2 : lastNumber;

  while (i < num && iter < limit) {
    if (num % i === 0) {
      completed = true;
      return false;
    }
    i++;
    iter++;
  }
  if (iter === limit) {
    completed = false;
    lastNumber = i;
  } else completed = true;
  return true;
}

setInterval(() => {
  if (isSimple(number)) {
    biggestNum = number;
  }
  if (completed) number++;
}, 0);

setInterval(() => {
  console.log(
    `${new Date().getTime()} -- IN PROCESS -- Biggest prime number found:${biggestNum}`,
  );
}, 1000);
