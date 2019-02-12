callbag-latest-batch
--------------------

[Callbag](https://github.com/callbag/callbag) operator that turns a listenable source into a pullable source, emiting all the data since the last request batched within an array, if any.

Much like [callbag-latest](https://github.com/krawaller/callbag-latest) but one that collects all the interim data.

[![npm version](https://badge.fury.io/js/callbag-latest-batch.svg)](https://badge.fury.io/js/callbag-latest-batch) 
[![Build Status](https://travis-ci.org/5310/callbag-latest-batch.svg?branch=master)](https://travis-ci.org/5310/callbag-latest-batch)

## example

```js
const interval = require('callbag-interval')
const sample = require('callbag-sample')
const pipe = require('callbag-pipe')
const latestBatch = require('callbag-latest-batch')

const randomStream = pipe( // random numbers generated every second
  interval(1000),
  map(() => Math.floor(Math.random()*100))
)

const submitActionStream = pipe( // collected into arrays every five seconds
  interval(5000),
  sample(latestBatch(randomStream)) 
)
```
