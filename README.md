
[![Build Status](https://travis-ci.org/hyanmandian/wait-as-promised.svg?branch=master)](https://travis-ci.org/hyanmandian/wait-as-promised)

## Install

```
$ yarn add wait-as-promised
```

## Usage

#### Basic usage

```js
const wait = require('wait-as-promised');

let value = false;

const predicate = () => value === true;

setTimeout(() => {
  value = true;
}, 2000);

wait(predicate).then(() => console.log('value equals true'));
```

#### Timeout

```js
const wait = require('wait-as-promised');

let value = false;

const predicate = () => value === true;

setTimeout(() => {
  value = true;
}, 2000);

// will throw an exception with message 'function timed out after 1000 milliseconds'
wait(predicate, {timeout: 1000}).then(() => console.log('value equals true'));
```

#### Disable Timeout

```js
const wait = require('wait-as-promised');

let value = false;

const predicate = () => value === true;

setTimeout(() => {
  value = true;
}, 2000);

wait(predicate, {timeout: -1}).then(() => console.log('value equals true'));
```
