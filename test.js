const test = require('tape')

const forEach = require('callbag-for-each')
const interval = require('callbag-interval')
const pipe = require('callbag-pipe')
const sample = require('callbag-sample')

const latestBatch = require('./')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('callbag-latest-batch', (t) => {
  t.plan(1)
  {
    const actual = []

    pipe(
      interval(500), 
      sample(latestBatch(interval(100))), 
      forEach(data => actual.push(data))
    )

    delay(500*3+10).then(() => {
      t.same(actual, [[0, 1, 2, 3], [4, 5, 6, 7, 8], [9, 10, 11, 12, 13]])
    })
  }

  delay(500*3+10+10).then(() => process.exit(0)) // needed due to leftover timeouts
})
