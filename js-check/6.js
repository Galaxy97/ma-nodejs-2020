const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];

first.reverse();
second.reverse();

let result = [];
first.forEach((element, index) => {
    result.push(element, second[index]);
});
console.log(result);
