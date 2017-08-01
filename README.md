> Easy way to wait for changes

[![Build Status](https://travis-ci.org/hyanmandian/wait-as-promised.svg?branch=master)](https://travis-ci.org/hyanmandian/wait-as-promised)

## Install

```
$ yarn add wait-as-promised
```

## Usage

```js
const wait = require('wait-as-promised');

let value = false;

const predicate = () => value === true;

setTimeout(() => {
  value = true;
}, 5000);

wait(predicate).then(() => console.log('value equals true'));
```
