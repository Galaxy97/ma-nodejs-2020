let promise = (timer) => {
  return new Promise(function(resolve) {
    setTimeout(() => resolve("done!"), timer);
  });
};

promise(150)
    .then(result => console.log(result))
    .catch(error => console.log(error));
