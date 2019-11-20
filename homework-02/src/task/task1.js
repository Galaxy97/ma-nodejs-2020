const sum = (...args) => {
  let suma = 0;
  args.forEach(element => {
    suma += element;
  });
  return suma;
};

module.exports = {sum};
