const vegetables = ["potato", "tomato", "cucumber"];
const fruits = ["apple", "pineapple", "banana"];

const findElement = "cucumber";

const found = vegetables.find(function(element) {
  return element === findElement;
});

if (found) {
  console.log("vegetables");
} else {
  console.log("fruits");
}

switch (found) {
  case undefined:
    console.log("fruits");
    break;
  default:
    console.log("vegetables");
    break;
}
