export default (predicate, {timeout} = {timeout: 5000}) => new Promise(resolve => {
  const racingPromises = [];

  const intervalPromise = new Promise(resolve => {
    const loop = setInterval(() => {
      if (predicate()) {
        clearInterval(loop);
        resolve('done');
      }
    });
  });

  racingPromises.push(intervalPromise);

  if (timeout >= 0) {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const timeoutMessage = `function timed out after ${timeout} milliseconds`;
        reject(new Error(timeoutMessage));
      }, timeout);
    });

    racingPromises.push(timeoutPromise);
  }

  return resolve(Promise.race(racingPromises));
});
