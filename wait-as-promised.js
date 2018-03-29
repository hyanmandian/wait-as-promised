export default (predicate, {timeout} = {timeout: 5000}) => new Promise(resolve => {
  const racingPromises = [];

  const intervalPromise = new Promise(resolve => {
    const loop = setInterval(() => {
      if (predicate()) {
        clearInterval(loop);
        resolve();
      }
    });
  });

  racingPromises.push(intervalPromise);

  if (timeout >= 0) {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(`function timed out after ${timeout} milliseconds`)), timeout);
    });

    racingPromises.push(timeoutPromise);
  }

  return resolve(Promise.race(racingPromises));
});
