function promise(timer, someText) {
  return new Promise(resolve => {
    setTimeout(() => resolve(someText), timer);
  });
}

module.exports = promise(1500, 'some text some text');
