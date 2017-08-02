'use strict';

const defaultOptions = {
  timeout: 5000,
  delay: 0,
};

const racingPromises = [];

let loop;

module.exports = (predicate, { timeout, delay } = defaultOptions) => new Promise(resolve => {
  const intervalPromise = new Promise(resolve => {
    loop = setInterval(() => {
      if (predicate()) {
        clearInterval(loop);
        resolve('done');
      }
    }, delay);
  });

  racingPromises.push(intervalPromise);

  if (timeout >= 0) {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        clearInterval(loop);
        reject(new Error(`function timed out after ${timeout} milliseconds`));
      }, timeout);
    });

    racingPromises.push(timeoutPromise);
  }

  return resolve(Promise.race(racingPromises));
});
