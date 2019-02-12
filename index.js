// Taken from: https://github.com/krawaller/callbag-latest/
const latestBatch = listenable => (start, sink) =>  {
  if (start !== 0) return
  let ltalkback
  let latestBatch = []
  let hasLatestValue = false;
  listenable(0, (lt, ld) => {
    if (lt === 0) {
      ltalkback = ld;
      sink(0, (st, sd) => {
        if (st === 1 && hasLatestValue) sink(1, [...latestBatch])
        latestBatch.length = 0
        if (st === 2) ltalkback(2, sd)
      })
    }
    if (lt === 1) {
      latestBatch.push(ld)
      hasLatestValue = true
    }
    if (lt === 2) sink(2, ld)
  })
}

module.exports = latestBatch
